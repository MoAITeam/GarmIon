import { IonContent, IonHeader, IonPage, IonTitle, IonSlides, IonToolbar, IonSlide, IonImg, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { camera } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const slideOpts = {
  initialSlide: 1,
  speed: 400
};

interface Paths {
  webviewPath?: string;
}

function GetPaths() {
  const [paths,setPaths] = useState<Paths[]>([]);
  const loadPaths = async () => {
    const newPaths = [
      {
        webviewPath: 'https://cdn.childrensalon.com/media/catalog/product/cache/0/small_image/256x256/9df78eab33525d08d6e5fb8d27136e95/d/o/dolce-gabbana-teen-pink-silk-chiffon-dress-391536-bd9ee07a750e0d454a0b93a2755c21687b16fd7d.jpg',
      },
      {
        webviewPath: 'https://cdn.childrensalon.com/media/catalog/product/cache/0/small_image/256x256/9df78eab33525d08d6e5fb8d27136e95/d/o/dolce-gabbana-teen-pink-silk-chiffon-dress-391536-bd9ee07a750e0d454a0b93a2755c21687b16fd7d.jpg',
      },
      {
        webviewPath: 'https://cdn.childrensalon.com/media/catalog/product/cache/0/small_image/256x256/9df78eab33525d08d6e5fb8d27136e95/d/o/dolce-gabbana-teen-pink-silk-chiffon-dress-391536-bd9ee07a750e0d454a0b93a2755c21687b16fd7d.jpg',
      }
      ];
      setPaths(newPaths);
  }

  return {
    paths, loadPaths
  };
}

const Tab3: React.FC = () => {
  const {paths, loadPaths} = GetPaths();
  const mySlides = useRef<HTMLIonSlidesElement>(null);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 3 page" />
        <IonSlides pager={true} options={slideOpts} key={paths.map((path,index) => path.webviewPath).join('_')}>
          {paths.map((path,index)=>(
            <IonSlide key={index}>
              <IonImg src={path.webviewPath} />
            </IonSlide>))
          }
        </IonSlides>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => {loadPaths();}}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
