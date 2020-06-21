import L from 'leaflet';
import bluePin from '../static/blue.png'
import redPin from '../static/red.png'
import yellowPin from '../static/yellow.png'
import purplePin from '../static/purple.png'
import greenPin from '../static/green.png'
import whitePin from '../static/white.png'

const respnetIcon = new L.Icon({
  iconUrl: bluePin,
  iconRetinaUrl: bluePin,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
})

const protnetIcon = new L.Icon({
  iconUrl: redPin,
  iconRetinaUrl: redPin,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
})

const tissuenetIcon = new L.Icon({
  iconUrl: yellowPin,
  iconRetinaUrl: yellowPin,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
})

const motifnetIcon = new L.Icon({
  iconUrl: greenPin,
  iconRetinaUrl: greenPin,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
})

const traceIcon = new L.Icon({
  iconUrl: whitePin,
  iconRetinaUrl: whitePin,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
})

const diffnetIcon = new L.Icon({
  iconUrl: purplePin,
  iconRetinaUrl: purplePin,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
})

const toolsColors = {
  ResponseNet: respnetIcon,
  MyProteinNet: protnetIcon,
  TissueNet: tissuenetIcon,
  TRACE: traceIcon,
  DiffNet: diffnetIcon,
  MotifNet: motifnetIcon
}

export default toolsColors;
