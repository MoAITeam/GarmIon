import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {IonList, IonItem, IonCheckbox, IonLabel, IonNote, IonBadge, IonFab, IonFabButton, IonIcon} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { add } from 'ionicons/icons';
import './Home.css';
import { RouteComponentProps } from "react-router-dom";

const Home: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonCheckbox slot="start" />
            <IonLabel>
              <h1>Create Idea</h1>
              <IonNote>Run Idea by Brandy</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="end">
              5 Days
            </IonBadge>
          </IonItem>
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => props.history.push('/new')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
