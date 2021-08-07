import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import {HTTP} from '@ionic-native/http';

const Tab1: React.FC = () => {
  const cordovaPost = async () => {HTTP.sendRequest('https://google.com/',
      {
        method: 'get',
        //data: { id: 12, message: 'test' },
        //headers: { Authorization: 'OAuth2: token' },
        timeout: 5000
      }
    )
      .then(response => {
        // prints 200
        console.log(response.status);
      })
      .catch(response => {
        // prints 403
        console.log(response);

        // prints Permission denied
        console.log(response);
      });}
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
        <IonButton onClick={cordovaPost}>Test Request</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
