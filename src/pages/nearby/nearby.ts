import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { HealthCenterRequest, HealthCenter } from '../../entity/healthCenter/healthCenter';
import { MyApp } from '../../app/app.component';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  ILatLng,
  LatLng
} from '@ionic-native/google-maps';

declare var google;
let map: any;
let infowindow: any;
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

@IonicPage()
@Component({
  selector: 'page-nearby',
  templateUrl: 'nearby.html',
})
export class NearbyPage {
  isLoading : boolean = true;
  dataList : HealthCenter[];
  mapReady: boolean = false;
  map: GoogleMap;
  translation:any={};
  constructor(public navCtrl: NavController,
    private commonProvider:CommonProvider,
    private toastCtrl : ToastController,
    private launchNavigator:LaunchNavigator,
    private loadingCtrl:LoadingController) {

  }

  ionViewWillEnter(){
    let translationSource = MyApp.translationSource.filter(x=>x.Screen=='Nearby')[0];
    this.translation=translationSource.Translation;

    //de1610c5fd834ef5b30be0702d7838ec
    
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        zoom: 18,
        tilt: 30
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;

      this.map.clear();
      this.map.getMyLocation()
      .then((location: MyLocation) => {        
        //this.getHealthCenter(location.latLng.lat, location.latLng.lng);        
        return this.map.animateCamera({
          target: location.latLng,
          zoom: 12,
          tilt: 30
        }).then(() => {
          this.getNearByHealthCenter(location.latLng);
          // add a marker
          return this.map.addMarker({
            title: '',
            position: location.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });
        })
      }).then((marker: Marker) => {
        marker.showInfoWindow();
        // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        //   this.showToast('clicked!');
        // });
      });
    });

    
    
  }

  getNearByHealthCenter(currentLocation:LatLng){
    let service = new google.maps.places.PlacesService(document.querySelector("div"));
    let request = {
      location : currentLocation,
      radius : 8047,
      types:['hospital']
    };
    return new Promise((resolve,reject)=>{
      service.nearbySearch(request,(response,status)=>{
        if(status == google.maps.places.PlacesServiceStatus.OK){
          console.log(response);
          resolve(response);
          this.dataList=[];
          response.forEach(x=>{
            let coordinate : ILatLng = {
              lat : x.geometry.location.lat(),
              lng : x.geometry.location.lng()
            }
            this.map.addMarker({
              title: x.name,
              position: coordinate
            });
            let distance = this.calculateDistance(currentLocation.lat,x.geometry.location.lat(),currentLocation.lng,x.geometry.location.lng());
            var distanceStr = distance>0 ? distance.toFixed(2)+" km" : (distance*100).toFixed(2)+" m";
            let item : HealthCenter = {
              Name : x.name,
              Address : x.vicinity,
              Phone: '',
              Latitude : x.geometry.location.lat(),
              Longitude : x.geometry.location.lng(),
              Distance : distanceStr,
              DistanceVal : distance
            };            
            this.dataList.push(item);
            this.dataList.sort((a,b)=>{ return a.DistanceVal>b.DistanceVal ? 1:-1; });
          });
        }else{
          reject(status);
        }
      });
    });
  }

  calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }

  getHealthCenter(latitude,longitude){
    let model : HealthCenterRequest = {
      Latitude : latitude,
      Longitude : longitude,
      Lang : MyApp.currentLanguage
    };
    let loading = this.loadingCtrl.create({content : MyApp.loadingMsg});
    loading.present();
    this.commonProvider.healthCenterList(model).subscribe(result=>{
      this.isLoading = false;
      loading.dismiss();
      this.dataList = result.Result;
      this.dataList.forEach(element => {
        let coordinate : ILatLng = {
          lat : parseFloat(element.Latitude),
          lng : parseFloat(element.Longitude)
        }
        this.map.addMarker({
          title: element.Name,
          position: coordinate
        });
      });
    });
  }



  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }
  
  navigate(item){
    this.launchNavigator.navigate([item.Latitude,item.Longitude]);
  }
  
}
