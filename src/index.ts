// @ts-nocheck
import { TrackMania } from './main';

const trackMania = new TrackMania();
// @ts-ignore
window.trackMania = trackMania;
trackMania.init(document.getElementById('track'), () => {}, false);


function setTrack() {
  trackMania.setTrack({
    "startTile": {
      "x": 0,
      "y": 0
    },
    "direction": 1,
    "size": {
      "x": 10,
      "y": 5
    },
    "tiles": {
      "9f92b763-472a-45cf-b672-4ec458088749": {
        "id": "9f92b763-472a-45cf-b672-4ec458088749",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 0,
          "y": 0
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "54a5e53c-ae00-4faa-94ba-b859f090dbe3": {
        "id": "54a5e53c-ae00-4faa-94ba-b859f090dbe3",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 0,
          "y": 1
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "3cf510b6-bf2f-43b1-a053-4254bd631a22": {
        "id": "3cf510b6-bf2f-43b1-a053-4254bd631a22",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 0,
          "y": 2
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "3d6423e9-e7b8-4687-8c63-99d768acc2ae": {
        "id": "3d6423e9-e7b8-4687-8c63-99d768acc2ae",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 0,
          "y": 3
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "e0935d28-a1ed-4172-99a8-327c251c1a66": {
        "id": "e0935d28-a1ed-4172-99a8-327c251c1a66",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 0,
          "y": 4
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "26102fe2-2624-464d-bb84-147d891b4d61": {
        "id": "26102fe2-2624-464d-bb84-147d891b4d61",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 1,
          "y": 0
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "7658e6be-ecf3-4723-8d08-6d48b173f505": {
        "id": "7658e6be-ecf3-4723-8d08-6d48b173f505",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 1,
          "y": 1
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "4ebbc7b9-8001-4a72-81d4-f5988d1ed531": {
        "id": "4ebbc7b9-8001-4a72-81d4-f5988d1ed531",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 1,
          "y": 2
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "1a3691be-3f22-4faf-9915-53ec4ac7fd7e": {
        "id": "1a3691be-3f22-4faf-9915-53ec4ac7fd7e",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 1,
          "y": 3
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "83d4d376-7d54-427c-af6b-318508d84380": {
        "id": "83d4d376-7d54-427c-af6b-318508d84380",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 1,
          "y": 4
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "fb503807-7ecf-447e-8f48-8a3f748d06f9": {
        "id": "fb503807-7ecf-447e-8f48-8a3f748d06f9",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 2,
          "y": 0
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "a3fbf9c3-0c36-4f64-8653-09506e8dd1d1": {
        "id": "a3fbf9c3-0c36-4f64-8653-09506e8dd1d1",
        "type": 1,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 2,
          "y": 1
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": 3
      },
      "8656628a-73ef-46ff-a109-4481a658a860": {
        "id": "8656628a-73ef-46ff-a109-4481a658a860",
        "type": 0,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 2,
          "y": 2
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": 0
      },
      "fd31d321-1827-4259-9f6f-3c280937387f": {
        "id": "fd31d321-1827-4259-9f6f-3c280937387f",
        "type": 1,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 2,
          "y": 3
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": 2
      },
      "d2a56731-cc44-4d13-a876-bf3892f127d9": {
        "id": "d2a56731-cc44-4d13-a876-bf3892f127d9",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 2,
          "y": 4
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "31539124-1c36-42d2-8929-5f55b224b54d": {
        "id": "31539124-1c36-42d2-8929-5f55b224b54d",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 3,
          "y": 0
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "4695666d-af77-499e-a1cc-49f33bd39db0": {
        "id": "4695666d-af77-499e-a1cc-49f33bd39db0",
        "type": 1,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 3,
          "y": 1
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": 4
      },
      "b37460f7-a45e-4f6f-ad54-252185cc96f2": {
        "id": "b37460f7-a45e-4f6f-ad54-252185cc96f2",
        "type": 1,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 3,
          "y": 2
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": 2
      },
      "4398cffc-d02e-4014-b22b-cb960b9d52c4": {
        "id": "4398cffc-d02e-4014-b22b-cb960b9d52c4",
        "type": 0,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 3,
          "y": 3
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": 1
      },
      "16b29c0c-61f5-463f-ad18-8ed7606d15f0": {
        "id": "16b29c0c-61f5-463f-ad18-8ed7606d15f0",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 3,
          "y": 4
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "383e5728-f7f2-4416-866c-8fe63d84f96f": {
        "id": "383e5728-f7f2-4416-866c-8fe63d84f96f",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 4,
          "y": 0
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "841ecf8b-7dc4-418c-8282-60c0bbbbda96": {
        "id": "841ecf8b-7dc4-418c-8282-60c0bbbbda96",
        "type": 1,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 4,
          "y": 1
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": 3
      },
      "ae948ed6-8a93-4071-bfe9-e66696f79bba": {
        "id": "ae948ed6-8a93-4071-bfe9-e66696f79bba",
        "type": 1,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 4,
          "y": 2
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": 5
      },
      "73773be9-c169-437a-9974-5daf3d145811": {
        "id": "73773be9-c169-437a-9974-5daf3d145811",
        "type": 0,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 4,
          "y": 3
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": 1
      },
      "48b2db90-3f47-4f15-abac-2d0ca0546c6b": {
        "id": "48b2db90-3f47-4f15-abac-2d0ca0546c6b",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 4,
          "y": 4
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "7eac0da5-0fb8-4067-8705-492ce85a2bbb": {
        "id": "7eac0da5-0fb8-4067-8705-492ce85a2bbb",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 5,
          "y": 0
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "0e1bdc29-d458-49c2-9f61-4ea51758c474": {
        "id": "0e1bdc29-d458-49c2-9f61-4ea51758c474",
        "type": 1,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 5,
          "y": 1
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": 4
      },
      "3105a1d6-17cf-48df-b736-58a36436b751": {
        "id": "3105a1d6-17cf-48df-b736-58a36436b751",
        "type": 0,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 5,
          "y": 2
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": 0
      },
      "d7474607-6d64-49c8-9185-12105afcf58e": {
        "id": "d7474607-6d64-49c8-9185-12105afcf58e",
        "type": 1,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 5,
          "y": 3
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": 5
      },
      "6ae4c6ea-3938-4801-ba4a-f9a4fec0538c": {
        "id": "6ae4c6ea-3938-4801-ba4a-f9a4fec0538c",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 5,
          "y": 4
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "d7a514e6-c91b-4adf-ba9e-3e4edfdfd4a6": {
        "id": "d7a514e6-c91b-4adf-ba9e-3e4edfdfd4a6",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 6,
          "y": 0
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "137e892f-20bf-4501-8fbc-4ab8caf73429": {
        "id": "137e892f-20bf-4501-8fbc-4ab8caf73429",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 6,
          "y": 1
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "9fe9e172-b605-46cd-8264-3bead73e392e": {
        "id": "9fe9e172-b605-46cd-8264-3bead73e392e",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 6,
          "y": 2
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "21e29350-1185-42bb-bcdf-dbf5bdf211ed": {
        "id": "21e29350-1185-42bb-bcdf-dbf5bdf211ed",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 6,
          "y": 3
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "0450510b-cfe8-4fee-8551-e4fd11f67cb8": {
        "id": "0450510b-cfe8-4fee-8551-e4fd11f67cb8",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 6,
          "y": 4
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "a15d227e-889e-485f-b790-fbfb59465d09": {
        "id": "a15d227e-889e-485f-b790-fbfb59465d09",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 7,
          "y": 0
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "e0973e60-2753-4832-972d-54ca0157a2c7": {
        "id": "e0973e60-2753-4832-972d-54ca0157a2c7",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 7,
          "y": 1
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "b4d061c9-8c5c-4333-90ab-4cc67436fe9c": {
        "id": "b4d061c9-8c5c-4333-90ab-4cc67436fe9c",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 7,
          "y": 2
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "e9186004-b8d3-43b3-b30d-e214ea4f7827": {
        "id": "e9186004-b8d3-43b3-b30d-e214ea4f7827",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 7,
          "y": 3
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "5ea9285d-acaf-4fed-8f52-ce8bf3cf280c": {
        "id": "5ea9285d-acaf-4fed-8f52-ce8bf3cf280c",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 7,
          "y": 4
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "44638086-58bd-45d0-b250-6de684f7a8ab": {
        "id": "44638086-58bd-45d0-b250-6de684f7a8ab",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 8,
          "y": 0
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "ea779b70-5f29-473b-a028-d9efe3f851e2": {
        "id": "ea779b70-5f29-473b-a028-d9efe3f851e2",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 8,
          "y": 1
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "c9e56e8b-ea8c-44ae-b8c7-ae5c9fa16071": {
        "id": "c9e56e8b-ea8c-44ae-b8c7-ae5c9fa16071",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 8,
          "y": 2
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "5b89d980-59e2-49a3-83aa-13508d4f1f68": {
        "id": "5b89d980-59e2-49a3-83aa-13508d4f1f68",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 8,
          "y": 3
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "15b14536-1360-489e-8bb0-cd21d1cd4f2c": {
        "id": "15b14536-1360-489e-8bb0-cd21d1cd4f2c",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 8,
          "y": 4
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "3a3332c4-11c4-41e2-94bb-feb1886968e2": {
        "id": "3a3332c4-11c4-41e2-94bb-feb1886968e2",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 9,
          "y": 0
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "70d4435e-fb72-4e5a-a4d5-236a0ee5fc46": {
        "id": "70d4435e-fb72-4e5a-a4d5-236a0ee5fc46",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 9,
          "y": 1
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "f14adb3e-1fcb-43b4-89f2-2d2dd23e3663": {
        "id": "f14adb3e-1fcb-43b4-89f2-2d2dd23e3663",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 9,
          "y": 2
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "dfee6a8e-a956-4622-8109-bd4828dc5d44": {
        "id": "dfee6a8e-a956-4622-8109-bd4828dc5d44",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 9,
          "y": 3
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      },
      "fcaf22b5-b9b4-4db5-8eff-fb104215bf9a": {
        "id": "fcaf22b5-b9b4-4db5-8eff-fb104215bf9a",
        "type": null,
        "endCoordinates": null,
        "startCoordinates": null,
        "position": {
          "x": 9,
          "y": 4
        },
        "size": {
          "x": 150,
          "y": 150
        },
        "subtype": null
      }
    }
  })
}

function newTrack() {
  trackMania.newTrack(5, 3);
}

trackMania.setCars([{
  key: 'a',
  color: 'yellow'
}]);
setTrack();
trackMania.race();
