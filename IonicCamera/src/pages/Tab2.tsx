import { camera, trash, close } from 'ionicons/icons';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet, IonSlides, IonSlide } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { usePhotoGallery } from "../hooks/usePhotoGallery";

const Tab2: React.FC = () => {
  const {photos,takePhoto} = usePhotoGallery();
  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>GarmIon</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
            {photos.slice(0,0+1).map((photo, index) => (
                <IonImg key={(index.toString())+'_imgkey'} src={photo.webviewPath} />
             ))}
      <IonSlides pager={true} options={slideOpts} key={photos.map((path) => path.webviewPath).join('_')}>
      {photos.slice(1,3).map((photo, index) => (
              <IonSlide key={(index.toString())+'_slidekey'}>
                <IonImg src={photo.webviewPath} />
              </IonSlide>
            ))}
      </IonSlides>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;