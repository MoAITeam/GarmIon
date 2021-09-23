# FLASK IMPORTS

from flask import Flask, render_template , request , jsonify
from flask import send_file
from PIL import Image
import os , io , sys
import numpy as np 
import cv2
import base64
from io import BytesIO

# SEGMENTATORE IMPORT

import pickle
import matplotlib.pyplot as plt

import tensorflow as tf

UNET = tf.keras.models.load_model('./trained_models/unet_one_sample_train_lol.h5')

# RACCOMANDAZIONI IMPORT

import pickle
import torch
import torch.nn as nn
from autoencoder import MyAutoencoder
from dataloader_garment import create_dataloader
from kobayashi import KobayashiClassifier
from memory_network import Model_controllerMem
from test_operations import manage_memory_init, load_dict_bottoms_ids_and_bottom_paths
import cv2

batch_size = 64 
batch_size_test = 1
base_path = './'
device = 'cuda:0' if torch.cuda.is_available() else 'cpu'
soglia = 0.5
criterion = nn.MSELoss()

app = Flask(__name__)

def cut(img):

    img = cv2.resize(img,(224,224))
    
    mask = np.zeros(img.shape[:2],np.uint8)
    bgdModel = np.zeros((1,65),np.float64)
    fgdModel = np.zeros((1,65),np.float64)
    height, width = img.shape[:2]

    rect = (50,10,width-100,height-20)
    cv2.grabCut(img,mask,rect,bgdModel,fgdModel,5,cv2.GC_INIT_WITH_RECT)
    mask2 = np.where((mask==2)|(mask==0),0,1).astype('uint8')
    img2 = img*mask2[:,:,np.newaxis]
    img2[mask2 == 0] = (255, 255, 255)
    
    final = np.ones(img.shape,np.uint8)*0 + img2
    
    return mask, final

def segment(payload):
    img = base64.b64decode(payload); 
    im_arr = np.frombuffer(img, dtype=np.uint8)  # im_arr is one-dim Numpy array
    original = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
    # im = cv2.imread("./test1.jpg")

    plt.figure(figsize=(16,8))
    original = cv2.resize(original,(224,224))

    plt.subplot(1,3,1)
    plt.imshow(cv2.cvtColor(original, cv2.COLOR_BGRA2RGB))
    mask, final = cut(original)
    plt.subplot(1,3,2)
    plt.imshow(mask)
    plt.subplot(1,3,3)
    plt.imshow(cv2.cvtColor(final, cv2.COLOR_BGRA2RGB))
    retval, buffer = cv2.imencode('.jpg', final)
    jpg_as_text = base64.b64encode(buffer)
    print(jpg_as_text)
    return jpg_as_text

def rec(payload):
    # DA CAMBIARE
    #dataset_path = 'D:/STORAGE/IQON3000/home/ldedivitiis/IQON3000/'
    num_predictions = 4  # Numero di bottom in output
    print('num_predictions:', num_predictions)
    top_path = './test1.jpg'  # Immagine da testare (top)
    #top_path = '/home/ldedivitiis/IQON3000/2505901/3680497/12611548_m.jpg'  # Immagine da testare (top)

    # ------------------- CARICAMENTO MODELLI ---------------------#
    # Autoencoder
    model_ae = MyAutoencoder().to(device)
    model_ae.load_state_dict(torch.load('best_model_deeper_CAE_piccolo-2_ep499_loss0.4784902993826985.pth',map_location=torch.device('cpu')))

    # Memory Network
    model_mem_n2n = Model_controllerMem(device)
    model_mem_n2n.load_state_dict(torch.load('best_model_mem_val_epoch_229_val_loss_0.05695536394198515_loss_0.47440056099473055.pth',map_location=torch.device('cpu')))

    # Load Kobayashi classifier
    kobayashi_classifier = KobayashiClassifier('resnet18_1620734491_epoch12_testacc78.585013.pth')
    kobayashi_classifier.to(device)

    # ------------------- INIT MODELLI ---------------------#

    # Dataloader
    path_train_csv = './train_clean_with_all.csv'
    train_loader = create_dataloader(path_train_csv, batch_size)

    memory_full = manage_memory_init(model_ae, model_mem_n2n, train_loader, device, soglia, num_predictions, criterion, memoryfull=True)
    memory_full.eval()

    # ------------------- TEST ---------------------#
    #I = cv2.imread(top_path)
    I = np.array(payload)

    top = torch.FloatTensor(I[None, ...]).permute(0, 3, 1, 2).to(device)

    # Ottieni raccomandazioni
    
    predictions_list, all_predictions_features = memory_full(top, num_predictions, model_ae, criterion, soglia, test=True)

    mem_bot_ids = torch.load('./files/mem_bot_ids.pt',map_location=torch.device('cpu'))

    with open("./all_ids_bottom_non_corrotti_tensors.pickle", "rb") as fp:
        all_keys = pickle.load(fp)

    all_rec_pred_index = memory_full.sorted_id[0, :num_predictions]
    all_rec_pred_id = [all_keys[mem_bot_ids[x]] for x in all_rec_pred_index]

    dict_id_path_bottom = load_dict_bottoms_ids_and_bottom_paths()
    list_bottom_paths = [dict_id_path_bottom.get(str(bot_id)) for bot_id in all_rec_pred_id]  # Bottom suggeriti

    # Ottieni categoria di Kobayashi


    new_list_bottom_paths = [] # ('.'+list_bottom_paths[0],'.'+list_bottom_paths[1], '.'+list_bottom_paths[2])
    for p in list_bottom_paths:
        new_list_bottom_paths.append('D:/STORAGE/IQON3000'+p)
    print(new_list_bottom_paths)
    pred_classes = kobayashi_classifier(payload,'', tuple(new_list_bottom_paths)).cpu().tolist()

    kob_classes = ['CHIC', 'CLASSIC', 'CLEAR', 'COOL-CASUAL', 'DANDY', 'DYNAMIC', 'ELEGANT', 'ETHNIC', 'FORMAL', 'GORGEOUS', 'MODERN', 'NATURAL', 'PRETTY', 'ROMANTIC', 'NO CLASS DEFINED']
    pred_classes_names = [kob_classes[x] for x in pred_classes] # Categorie degli outfit suggeriti

    res = []
    for z in range(0,num_predictions):
        j = {"link":new_list_bottom_paths[z],"class":pred_classes_names[z]}
        res.append(j)

    return res


############################################## THE REAL DEAL ###############################################
@app.route('/getBase64Picture' , methods=['POST'])
def mask_image():
    #with open("C:/Users/ciuff/Desktop/recnet/test2.jpg", 'rb') as infile:
    #    buf = infile.read()
    #use numpy to construct an array from the bytes
    #x = np.fromstring(buf, dtype='uint8')
    #decode the array into an image
    #img = cv2.imdecode(x, cv2.IMREAD_COLOR)
    ######### Do preprocessing here ################
    # img[img > 150] = 0
    ## any random stuff do here
    #print(request.form)
    s = segment(request.form['image'])
    ################################################
    #img = Image.fromarray(img.astype("uint8"))
    #rawBytes = io.BytesIO()
    #img.save(rawBytes, "JPEG")
    #rawBytes.seek(0)
    #img_base64 = base64.b64encode(rawBytes.read()).decode('ascii')
    return jsonify({'status':s.decode('ascii')})

@app.route('/getRecommendations' , methods=['POST'])
def get_recs():
    img = base64.b64decode(request.form['image']); 
    im_arr = np.frombuffer(img, dtype=np.uint8)  # im_arr is one-dim Numpy array
    original = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
    to_scale = Image.fromarray(original.astype("uint8"))
    scaled = to_scale.resize((150, 150))
    #buff = BytesIO()
    #scaled.save(buff, format="JPEG")
    #img_str = base64.b64encode(buff.getvalue())
    preds = rec(scaled)

    return jsonify(preds)

@app.route('/getPhoto' , methods=['GET'])
def get_photo():
    path = request.args.get('path')
    
    '''
    VERSIONE BASE64

    with open(path, 'rb') as infile: # da modificare
        buf = infile.read()
    im_arr = np.frombuffer(buf, dtype=np.uint8)
    #decode the array into an image
    img = cv2.imdecode(im_arr, cv2.IMREAD_COLOR)
    retval, buffer = cv2.imencode('.jpg', img)
    jpg_as_text = base64.b64encode(buffer)

    return jsonify({'photo':jpg_as_text.decode('ascii')})'''
    return send_file(path, mimetype='image/jpg')



##################################################### THE REAL DEAL HAPPENS ABOVE ######################################

@app.route('/test' , methods=['GET','POST'])
def test():
    print("log: got at test" , file=sys.stderr)
    return jsonify({'status':'succces'})

@app.route('/home')
def home():
    return render_template('index.jinja2')



@app.after_request
def after_request(response):
    print("log: setting cors" , file = sys.stderr)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


if __name__ == '__main__':

	app.run(debug = True, host='0.0.0.0')