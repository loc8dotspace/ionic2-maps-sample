import {Page} from 'ionic-angular'
import {Geolocation} from 'ionic-native'

@Page({
  templateUrl: 'build/pages/map/map.html'
})

export class MapPage {

  constructor() {
    this.map = null
    this.loadMap()
  }

  loadMap() {
    let options = {timeout: 10000, enableHighAccuracy: true}

    Geolocation.getCurrentPosition().then(
      (position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(document.getElementById("map"), mapOptions)
      },

      (err) => {
        console.error(err)
      },
      options
    )
  }

  currentLocation() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    })

    let content = "<h4> My Location </h4>"

    this.addInfoWindow(marker, content)
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    })

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker)
    })
  }
}
