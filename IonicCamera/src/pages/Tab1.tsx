import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItemDivider, IonListHeader, IonLabel, IonItem, IonSelect, IonSelectOption} from '@ionic/react';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [event_type, setEvent] = useState<string>();
  const [mood, setMood] = useState<string>('happy'); 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
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
          <IonItemDivider>Your Selections</IonItemDivider>
          <IonItem>Event: {event_type ?? '(none selected)'}</IonItem>
          <IonItem>Mood: {mood}</IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
