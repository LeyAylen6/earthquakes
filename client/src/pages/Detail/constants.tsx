import { Feature } from "../Home/interfaces";
import { DetailItem } from "./interfaces";

export const detailItems = (feature: Feature): DetailItem[] => [
    {
        title: "title",
        ubication: feature.attributes.title,
        color: undefined,
    }, {
        title: "Mag Type: ",
        ubication: feature.attributes.mag_type,
        color: "primary",
    }, {
        title: "Magnitude: ",
        ubication: feature.attributes.magnitude.toString(),
        color: "primary",
    }, {
        title: "Place: ",
        ubication: feature.attributes.place,
        color: "primary",
    }, {
        title: "Time: ",
        ubication: new Date(feature.attributes.time).toLocaleString(),
        color: "primary",
    }, {
        title: "Tsunami: ",
        ubication: !!feature.attributes.tsunami ? "Yes" : "No",
        color: "secondary",
    }, {
        title: "Longitude: ",
        ubication: feature.attributes.coordinates.longitude.toString(),
        color: "primary",
    }, {
        title: "Latitude: ",
        ubication: feature.attributes.coordinates.latitude.toString(),
        color: "primary",
    }, {
        title: "+ info: ",
        ubication: feature.links.external_url,
        color: undefined
    }
]