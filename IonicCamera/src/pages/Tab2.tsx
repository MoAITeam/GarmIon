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
      <IonSlides pager={true} options={slideOpts} key={photos.map((path,index) => path.webviewPath).join('_')}>
      {photos.map((photo, index) => (
              <IonSlide key={index}>
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