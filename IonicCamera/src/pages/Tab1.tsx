import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItemDivider, IonListHeader, IonLabel, IonItem, IonSelect, IonSelectOption, IonImg, IonSlides, IonSlide, IonFab, IonFabButton, IonIcon} from '@ionic/react';
import { useState } from 'react';
import { camera, trash, close } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import './Tab1.css';

/*

"Come leggere i valori scelti"

<IonItemDivider>Your Selections</IonItemDivider>
          <IonItem>Event: {event_type ?? '(none selected)'}</IonItem>
          <IonItem>Mood: {mood}</IonItem>
*/

const Tab1: React.FC = () => {
  const [event_type, setEvent] = useState<string>();
  const [mood, setMood] = useState<string>('happy'); 
  const {photos,takePhoto} = usePhotoGallery();
  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  const imgSize = {
    width: '10%',
    margin: 'auto',
    display: 'block'
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonListHeader>
            <IonLabel>
              Single Selection
            </IonLabel>
          </IonListHeader>

          <IonItem>
            <IonLabel>Event</IonLabel>
            <IonSelect value={event_type} placeholder="Select Event" onIonChange={e => setEvent(e.detail.value)}>
              <IonSelectOption value="wedding">Wedding</IonSelectOption>
              <IonSelectOption value="funeral">Funeral</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Mood</IonLabel>
            <IonSelect value={mood} okText="Okay" cancelText="Dismiss" onIonChange={e => setMood(e.detail.value)}>
              <IonSelectOption value="happy">Happpy</IonSelectOption>
              <IonSelectOption value="sad">Sad</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
        {photos.slice(0,0+1).map((photo, index) => (
          <IonImg style={imgSize} key={(index.toString())+'_imgkey'} src={photo.webviewPath} />
        ))}
        <IonSlides pager={true} options={slideOpts} key={photos.map((path) => path.webviewPath).join('_')}>
        {photos.slice(1,3).map((photo, index) => (
                <IonSlide key={(index.toString())+'_slidekey'}>
                  <IonImg style={imgSize} src={photo.webviewPath} />
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

export default Tab1;
