import { defineStore } from "pinia";
import { ref } from 'vue'
import {getCourtInfo} from '/src/services/getCourtInfo.js'

export const useCourtInfo = defineStore('courtInfo', () => {
    const courtName = ref({
        "A1" : "九龙湖三号馆1号场",
        "A2" : "九龙湖三号馆2号场",
        "A3" : "九龙湖三号馆3号场",
        "A4" : "九龙湖三号馆4号场",
        "A5" : "九龙湖三号馆5号场",
        "A6" : "九龙湖三号馆6号场",
        "A7" : "九龙湖三号馆7号场",
        "A8" : "九龙湖三号馆8号场",
        "A9" : "九龙湖三号馆9号场",
        "B1" : "九龙湖二号馆1号场",
        "B2" : "九龙湖二号馆2号场",
        "B3" : "九龙湖二号馆3号场",
        "B4" : "九龙湖二号馆4号场"
    })
    const courtNo = ref([
        'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'B1', 'B2', 'B3', 'B4'
    ])

    const timeSlot = ref([
        '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
    ])

    const courtInfo = ref({
        "A1": {
            "resource_id": "729abd74-048d-4cc8-9f4a-5ca4180b05dd",
            "slots": {
                "09:00": {
                    "id": "8fd28d38-1f92-40af-b62d-73984a71d458",
                    "canAppointmentNumber": 0
                },
                "10:00": {
                    "id": "1bc90998-59d8-44a3-bd8e-465f12a588d0",
                    "canAppointmentNumber": 0
                },
                "11:00": {
                    "id": "331d0c73-8cc5-4d76-9abf-5bfb5bb6d049",
                    "canAppointmentNumber": 0
                },
                "12:00": {
                    "id": "5510988f-e2d1-44a0-997a-d04906dd3b45",
                    "canAppointmentNumber": 0
                },
                "13:00": {
                    "id": "8055be74-71da-4904-985e-3095f7e3aa7f",
                    "canAppointmentNumber": 0
                },
                "14:00": {
                    "id": "37148d28-ad71-4474-8083-708ba3cdd0ca",
                    "canAppointmentNumber": 0
                },
                "15:00": {
                    "id": "c2745be8-cd11-47b2-b704-ebdabb2792d9",
                    "canAppointmentNumber": 0
                },
                "16:00": {
                    "id": "1779af6b-d572-441a-b152-619e76e22af9",
                    "canAppointmentNumber": 0
                },
                "17:00": {
                    "id": "7db578d4-95cb-4b5c-8a31-ea70f1d07dc5",
                    "canAppointmentNumber": 0
                },
                "18:00": {
                    "id": "b82bcd92-44dc-45c2-a362-2df7b9d87a1d",
                    "canAppointmentNumber": 0
                },
                "19:00": {
                    "id": "badf534b-1979-4b12-8c6c-dc461980a599",
                    "canAppointmentNumber": 0
                },
                "20:00": {
                    "id": "3e86909d-ca90-495d-8aa6-01e4264a3f56",
                    "canAppointmentNumber": 0
                }
            }
        },
        "A2": {
            "resource_id": "4127e777-5eae-4ac3-a092-c9dea1659e94",
            "slots": {
                "09:00": {
                    "id": "ee791ef5-b9f5-4698-9100-09b158315ab4",
                    "canAppointmentNumber": 0
                },
                "10:00": {
                    "id": "3a11f411-f7ef-40fa-a0e9-bfc2bc4a2491",
                    "canAppointmentNumber": 0
                },
                "11:00": {
                    "id": "4caf3155-e57c-47dd-b409-885bd63208bb",
                    "canAppointmentNumber": 0
                },
                "12:00": {
                    "id": "ddf15b4d-92e4-44e7-9d56-797f4a4a2260",
                    "canAppointmentNumber": 0
                },
                "13:00": {
                    "id": "6fde1801-9cc5-4521-a0a4-0ee1c1b2dbfa",
                    "canAppointmentNumber": 0
                },
                "14:00": {
                    "id": "78e11b02-89d2-47b5-b682-a1989cd0276c",
                    "canAppointmentNumber": 0
                },
                "15:00": {
                    "id": "ffd3e50c-3519-41a1-aa68-993479a1e651",
                    "canAppointmentNumber": 0
                },
                "16:00": {
                    "id": "ea6a4552-b585-434e-b114-9ff6f7154ed6",
                    "canAppointmentNumber": 0
                },
                "17:00": {
                    "id": "dea98570-95de-4be2-8821-04867d32f32f",
                    "canAppointmentNumber": 0
                },
                "18:00": {
                    "id": "c5b9a119-b77b-42c5-9db6-4d2c12ba1d7c",
                    "canAppointmentNumber": 0
                },
                "19:00": {
                    "id": "651a4755-ca6a-4555-98a1-d0bbee59775d",
                    "canAppointmentNumber": 0
                },
                "20:00": {
                    "id": "eee2cf07-32ea-46e6-a676-2c8bd90e4b25",
                    "canAppointmentNumber": 0
                }
            }
        },
        "A3": {
            "resource_id": "d1d3c331-ba9a-4544-9df2-895fff9437d9",
            "slots": {
                "09:00": {
                    "id": "718f3a76-e385-4136-a007-1acd3a8a118d",
                    "canAppointmentNumber": 0
                },
                "10:00": {
                    "id": "572db3a9-3c76-489a-acb4-0ea68a0e72b9",
                    "canAppointmentNumber": 0
                },
                "11:00": {
                    "id": "d924a76d-6764-4a0b-a927-f9f8fced0428",
                    "canAppointmentNumber": 0
                },
                "12:00": {
                    "id": "4e833eb2-8d7b-4188-ad42-fc512939473e",
                    "canAppointmentNumber": 0
                },
                "13:00": {
                    "id": "19f10a43-8984-4bbf-b07a-764d464f296d",
                    "canAppointmentNumber": 0
                },
                "14:00": {
                    "id": "c617c879-a65d-4c0d-854d-b7073878d511",
                    "canAppointmentNumber": 0
                },
                "15:00": {
                    "id": "5c570795-4112-4412-b3e2-5153b0511a04",
                    "canAppointmentNumber": 0
                },
                "16:00": {
                    "id": "c09d769a-af3c-4dcf-88a2-79724335cc3c",
                    "canAppointmentNumber": 0
                },
                "17:00": {
                    "id": "26d11570-cac7-4f2b-8cd8-a984b666e755",
                    "canAppointmentNumber": 0
                },
                "18:00": {
                    "id": "34565f64-ced4-461e-9dc9-c3d760a463b4",
                    "canAppointmentNumber": 0
                },
                "19:00": {
                    "id": "4045a493-2e98-46bd-9e04-ff49de65e7f1",
                    "canAppointmentNumber": 0
                },
                "20:00": {
                    "id": "f8eeb9fc-9abe-4721-b2d0-ba02001a06e3",
                    "canAppointmentNumber": 0
                }
            }
        },
        "A4": {
            "resource_id": "91b89b96-1009-44ed-9cd7-4250a0696f70",
            "slots": {
                "09:00": {
                    "id": "a73aab44-2788-4055-ba9a-0c3a75875a27",
                    "canAppointmentNumber": 0
                },
                "10:00": {
                    "id": "ac19d738-852e-4b64-a092-1ce89e6a0e41",
                    "canAppointmentNumber": 0
                },
                "11:00": {
                    "id": "94eeabc6-0347-4eae-a608-b8eb151c09fe",
                    "canAppointmentNumber": 0
                },
                "12:00": {
                    "id": "282dff8e-551f-42d3-8fc1-8cecb707307f",
                    "canAppointmentNumber": 0
                },
                "13:00": {
                    "id": "12afa9ab-31fb-4ab4-ae7a-f1ddcbd8f44a",
                    "canAppointmentNumber": 0
                },
                "14:00": {
                    "id": "0a99aae2-4610-4a6c-a0b0-150050df6f72",
                    "canAppointmentNumber": 0
                },
                "15:00": {
                    "id": "2bd5d60c-57b8-4e21-aa70-c38f78f346be",
                    "canAppointmentNumber": 0
                },
                "16:00": {
                    "id": "de15e8f2-ab11-4530-8d5d-2e04e40468ad",
                    "canAppointmentNumber": 0
                },
                "17:00": {
                    "id": "71447d31-cfe0-4a27-b1b8-fc28420c8321",
                    "canAppointmentNumber": 0
                },
                "18:00": {
                    "id": "5b0a9cac-dded-4ca9-a4b4-441b68031243",
                    "canAppointmentNumber": 0
                },
                "19:00": {
                    "id": "8aa89056-71f8-4ef7-9163-1f099ba63f12",
                    "canAppointmentNumber": 0
                },
                "20:00": {
                    "id": "58841318-b8e5-480b-a1d5-9cc73f21c03f",
                    "canAppointmentNumber": 0
                }
            }
        },
        "A5": {
            "resource_id": "51589827-a2e0-47e8-a290-62bc7e6c927e",
            "slots": {
                "09:00": {
                    "id": "2138a323-608d-48bd-9c08-965296cba5d2",
                    "canAppointmentNumber": 0
                },
                "10:00": {
                    "id": "e723a0d8-d3c5-4a7e-9dbd-9dd5fe91927b",
                    "canAppointmentNumber": 0
                },
                "11:00": {
                    "id": "40261817-a13f-4885-94ca-0f2351dd6580",
                    "canAppointmentNumber": 0
                },
                "12:00": {
                    "id": "663fdcc1-c44b-4c77-a47e-308cc8aa7c1b",
                    "canAppointmentNumber": 0
                },
                "13:00": {
                    "id": "03a063bd-32ad-47a5-8781-0543df5aa323",
                    "canAppointmentNumber": 0
                },
                "14:00": {
                    "id": "92a3b292-3606-4c52-aafe-89a42bf54238",
                    "canAppointmentNumber": 0
                },
                "15:00": {
                    "id": "2240f628-37e0-4e05-a4bc-083ba6732dab",
                    "canAppointmentNumber": 0
                },
                "16:00": {
                    "id": "015b53b7-28cd-4693-91e5-aa87718c8076",
                    "canAppointmentNumber": 0
                },
                "17:00": {
                    "id": "cff98634-e595-4e6d-bb57-c2bf704f6c9b",
                    "canAppointmentNumber": 0
                },
                "18:00": {
                    "id": "fd46042e-2c25-4dc0-9df7-3f12fe8395c1",
                    "canAppointmentNumber": 0
                },
                "19:00": {
                    "id": "7f5e5f91-f4fe-43ad-a0d7-92c2b1db520e",
                    "canAppointmentNumber": 0
                },
                "20:00": {
                    "id": "c45dd49b-4ee1-484c-bd4e-b5652bee9352",
                    "canAppointmentNumber": 0
                }
            }
        },
        "A6": {
            "resource_id": "89676265-1625-4f3f-a966-4102ae29f1f5",
            "slots": {
                "09:00": {
                    "id": "878ec123-165a-4c89-bf2b-2d8fa539b4b4",
                    "canAppointmentNumber": 0
                },
                "10:00": {
                    "id": "ca1c7a12-ef09-431f-bf12-6e887b042ecc",
                    "canAppointmentNumber": 0
                },
                "11:00": {
                    "id": "631cbd02-231c-4dd1-8b68-7ec561c4927a",
                    "canAppointmentNumber": 0
                },
                "12:00": {
                    "id": "600c8ead-08b2-4e14-8d1d-022196622b52",
                    "canAppointmentNumber": 0
                },
                "13:00": {
                    "id": "70a01cb7-0bef-4412-8f5d-849770e2b953",
                    "canAppointmentNumber": 0
                },
                "14:00": {
                    "id": "a923d5f7-b97a-452a-91a2-3d9d099fd3a2",
                    "canAppointmentNumber": 0
                },
                "15:00": {
                    "id": "d426ca5c-a4aa-418f-91bc-01671176183f",
                    "canAppointmentNumber": 0
                },
                "16:00": {
                    "id": "6c908a9a-8153-4fe7-8d85-3f3554b4f5f2",
                    "canAppointmentNumber": 0
                },
                "17:00": {
                    "id": "a242b288-b300-407f-a4b2-db6de4d6e7b2",
                    "canAppointmentNumber": 0
                },
                "18:00": {
                    "id": "3024f604-2ef1-4c9e-b7dc-8af07f08e553",
                    "canAppointmentNumber": 0
                },
                "19:00": {
                    "id": "3d865303-b2a0-4fd2-b4fb-632bf4e52596",
                    "canAppointmentNumber": 0
                },
                "20:00": {
                    "id": "c58115e1-858e-4031-8a59-e7f0dfbe2636",
                    "canAppointmentNumber": 0
                }
            }
        },
        "A7": {
            "resource_id": "ea4e2fd7-2ca7-46fe-892f-43c8580f6159",
            "slots": {
                "09:00": {
                    "id": "38f8af6a-9ba9-427b-9b83-7b6016225f15",
                    "canAppointmentNumber": 0
                },
                "10:00": {
                    "id": "56c1ae91-4ec0-43f5-868b-ab33612a7d91",
                    "canAppointmentNumber": 0
                },
                "11:00": {
                    "id": "ad7aa776-78dd-4c79-bb40-c67b98d72be7",
                    "canAppointmentNumber": 0
                },
                "12:00": {
                    "id": "ba06cd56-b221-4058-b55c-fcf75c81b969",
                    "canAppointmentNumber": 0
                },
                "13:00": {
                    "id": "08016de7-4595-467e-9c7a-7ea54ccc3258",
                    "canAppointmentNumber": 0
                },
                "14:00": {
                    "id": "3f7baa51-cdd8-40f6-ad95-1a790c70e2a5",
                    "canAppointmentNumber": 0
                },
                "15:00": {
                    "id": "961f6348-5b5c-4a76-948c-840bdf9c8354",
                    "canAppointmentNumber": 0
                },
                "16:00": {
                    "id": "0c6de41b-f30f-49b1-81c0-446d9c14f612",
                    "canAppointmentNumber": 0
                },
                "17:00": {
                    "id": "679807b2-2bfe-44a8-8971-3621797942c8",
                    "canAppointmentNumber": 0
                },
                "18:00": {
                    "id": "3fdd6eae-2c26-4377-ba24-e092cf718469",
                    "canAppointmentNumber": 0
                },
                "19:00": {
                    "id": "1162e06e-66dc-4c3d-b660-6a96eb127fd2",
                    "canAppointmentNumber": 0
                },
                "20:00": {
                    "id": "5f069c87-f9de-4ae2-b3f1-48cbf640fbdb",
                    "canAppointmentNumber": 0
                }
            }
        },
        "A8": {
            "resource_id": "b3d7bfc0-aa86-4fb8-868a-0ca9d4a3ebda",
            "slots": {
                "09:00": {
                    "id": "b4ae04a5-f7cc-4291-9441-73a7b411702f",
                    "canAppointmentNumber": 0
                },
                "10:00": {
                    "id": "66823512-0a5d-4f21-8734-2ee69e856987",
                    "canAppointmentNumber": 0
                },
                "11:00": {
                    "id": "c968878a-2132-4d6e-9fc9-8a0e7c10e7d5",
                    "canAppointmentNumber": 0
                },
                "12:00": {
                    "id": "241e27d3-285d-4be9-a3ad-47c3aff3ceae",
                    "canAppointmentNumber": 0
                },
                "13:00": {
                    "id": "9f42b88a-2ee7-42c3-9d05-31a96bc3b597",
                    "canAppointmentNumber": 0
                },
                "14:00": {
                    "id": "69474724-1ed7-4546-832f-08172b97d123",
                    "canAppointmentNumber": 0
                },
                "15:00": {
                    "id": "3869a3c7-472f-4edf-a90a-26d142addf8f",
                    "canAppointmentNumber": 0
                },
                "16:00": {
                    "id": "feb9fed7-20cd-4b4b-888e-2ad9be64994c",
                    "canAppointmentNumber": 0
                },
                "17:00": {
                    "id": "cd3f36b5-fec7-448e-830f-4c2f3f7bb405",
                    "canAppointmentNumber": 0
                },
                "18:00": {
                    "id": "0d8b0031-8612-4112-bfac-a9d7636464ea",
                    "canAppointmentNumber": 0
                },
                "19:00": {
                    "id": "ec7b0067-6171-4821-b8ef-b70124038913",
                    "canAppointmentNumber": 0
                },
                "20:00": {
                    "id": "1747fd49-4827-4d7c-83a2-38c58b01eea5",
                    "canAppointmentNumber": 0
                }
            }
        },
        "A9": {
            "resource_id": "592de70b-49ae-4284-a08e-a40b950c79d4",
            "slots": {
                "09:00": {
                    "id": "98d281b5-0507-4ca5-b1c4-f263938e38ad",
                    "canAppointmentNumber": 0
                },
                "10:00": {
                    "id": "8f698018-db73-4b82-9077-d3f4f74caf51",
                    "canAppointmentNumber": 0
                },
                "11:00": {
                    "id": "01e29078-4b50-45fb-b483-804b8286875b",
                    "canAppointmentNumber": 0
                },
                "12:00": {
                    "id": "36bea0fe-e4d2-4fb1-9c8a-122374b463ad",
                    "canAppointmentNumber": 0
                },
                "13:00": {
                    "id": "daa3de53-1dd2-49bc-8701-a922ddf24c2e",
                    "canAppointmentNumber": 0
                },
                "14:00": {
                    "id": "81e44060-e508-4985-9f9b-63d794507251",
                    "canAppointmentNumber": 0
                },
                "15:00": {
                    "id": "68180c73-f120-4e07-adb4-4f6b5e56f759",
                    "canAppointmentNumber": 0
                },
                "16:00": {
                    "id": "849cb1a4-1b8c-41a2-b42a-f86cf047601f",
                    "canAppointmentNumber": 0
                },
                "17:00": {
                    "id": "3c35746d-eb89-4fc8-9be7-ecd677d96d6d",
                    "canAppointmentNumber": 0
                },
                "18:00": {
                    "id": "ec23fa6b-923c-4146-a38f-ee48e7325a3c",
                    "canAppointmentNumber": 0
                },
                "19:00": {
                    "id": "f2bb85d0-21b7-46e8-9e0a-2cc4229a3f52",
                    "canAppointmentNumber": 0
                },
                "20:00": {
                    "id": "c25ad31f-8ebb-4bce-9e4b-453042762e94",
                    "canAppointmentNumber": 0
                }
            }
        },
        "B1": {
            "resource_id": "60fc45cc-a53e-4b00-8abb-1fc910a3561b",
            "slots": {
                "09:00": {
                    "id": "a7c4bae9-f403-4607-bcc1-264b43195e85",
                    "canAppointmentNumber": 0
                },
                "10:00": {
                    "id": "7b1f9aaf-2a68-40a1-898a-46a34a9c2e2c",
                    "canAppointmentNumber": 0
                },
                "11:00": {
                    "id": "0ca45d67-4c2d-4f94-ac15-ed7b4bf351fa",
                    "canAppointmentNumber": 0
                },
                "12:00": {
                    "id": "6ab0da00-9ef0-4dc5-b2f9-f4308af2c3da",
                    "canAppointmentNumber": 0
                },
                "13:00": {
                    "id": "a9bc0c34-abc5-4d69-90f0-40686d074b34",
                    "canAppointmentNumber": 0
                },
                "14:00": {
                    "id": "7940eb2e-3865-4c16-896e-7167578da453",
                    "canAppointmentNumber": 0
                },
                "15:00": {
                    "id": "29a929fe-c7db-4c85-afc2-c28ddba903e6",
                    "canAppointmentNumber": 0
                },
                "16:00": {
                    "id": "6b7cb7ec-c00c-4cf7-99ce-69181d305fa4",
                    "canAppointmentNumber": 0
                },
                "17:00": {
                    "id": "8c0d0487-3551-4749-af14-b912331e2938",
                    "canAppointmentNumber": 0
                },
                "18:00": {
                    "id": "4c5dc42b-b83f-46bf-a313-e93b46443b83",
                    "canAppointmentNumber": 0
                },
                "19:00": {
                    "id": "95a3073f-e1c2-449e-b20b-fcbd4450b386",
                    "canAppointmentNumber": 0
                },
                "20:00": {
                    "id": "bd53ce76-07e9-437b-a126-350f44679bb3",
                    "canAppointmentNumber": 0
                }
            }
        },
        "B2": {
            "resource_id": "67ebde72-0f61-4083-8a49-cec8a12391a0",
            "slots": {
                "09:00": {
                    "id": "754a9a0b-8af9-4cc5-997b-c046e55b9501",
                    "canAppointmentNumber": 0
                },
                "10:00": {
                    "id": "be5aec87-8663-4ef5-801f-194772efb12c",
                    "canAppointmentNumber": 0
                },
                "11:00": {
                    "id": "896a015f-acd1-4c66-9258-5146c3bae8e0",
                    "canAppointmentNumber": 0
                },
                "12:00": {
                    "id": "0089fb2a-cbab-4f1f-b28b-46fe859c9dd1",
                    "canAppointmentNumber": 0
                },
                "13:00": {
                    "id": "ecd00304-5e7f-47e4-a7fc-2dd9e4f3fa48",
                    "canAppointmentNumber": 0
                },
                "14:00": {
                    "id": "43fcd044-39c1-4ae3-87fd-6e299fad4058",
                    "canAppointmentNumber": 0
                },
                "15:00": {
                    "id": "04e5051f-c2ae-4588-8461-1a215db72bda",
                    "canAppointmentNumber": 0
                },
                "16:00": {
                    "id": "e706d557-b789-410f-ae88-4b423b7e2e83",
                    "canAppointmentNumber": 0
                },
                "17:00": {
                    "id": "d2c00507-8f8a-4ebf-91c1-296ef02a66c7",
                    "canAppointmentNumber": 0
                },
                "18:00": {
                    "id": "e3cd292a-94d7-41f8-9640-f6aff11866f0",
                    "canAppointmentNumber": 0
                },
                "19:00": {
                    "id": "7b73ff9a-e0ff-4c18-9083-83f10e246432",
                    "canAppointmentNumber": 0
                },
                "20:00": {
                    "id": "e0a8a978-a534-49d8-a1c5-e8e468065129",
                    "canAppointmentNumber": 0
                }
            }
        },
        "B3": {
            "resource_id": "0fa06ca6-cde6-4c28-8ca2-d46cd6dd5575",
            "slots": {
                "09:00": {
                    "id": "c8db6e8c-5290-4ec2-8cd1-b19bfb14627d",
                    "canAppointmentNumber": 0
                },
                "10:00": {
                    "id": "7988c9ae-eda3-4ce2-8851-0f766365ab13",
                    "canAppointmentNumber": 0
                },
                "11:00": {
                    "id": "f023b89d-c7ab-4e27-8936-2d912f5051c3",
                    "canAppointmentNumber": 0
                },
                "12:00": {
                    "id": "c4046a92-2893-42b2-8617-9c0f93104ead",
                    "canAppointmentNumber": 0
                },
                "13:00": {
                    "id": "f8e69db1-d0fc-475b-881b-f7cb817b8b80",
                    "canAppointmentNumber": 0
                },
                "14:00": {
                    "id": "7dfe40d1-b064-4834-a49a-e74572780573",
                    "canAppointmentNumber": 0
                },
                "15:00": {
                    "id": "b8244255-6070-4aa9-9b76-7e1b55a65019",
                    "canAppointmentNumber": 0
                },
                "16:00": {
                    "id": "eff5a09e-c4fa-4cd1-ac6d-1295151b4d5d",
                    "canAppointmentNumber": 0
                },
                "17:00": {
                    "id": "61583a6a-fe5f-4cf8-ba71-18401bd7cee3",
                    "canAppointmentNumber": 0
                },
                "18:00": {
                    "id": "110ccdd3-f9de-42f9-b199-b45b83da6e01",
                    "canAppointmentNumber": 0
                },
                "19:00": {
                    "id": "1b3e01a2-e3cd-45ba-88b9-0c8b95c460f4",
                    "canAppointmentNumber": 0
                },
                "20:00": {
                    "id": "cb1aa967-7c66-463c-8c2a-ac16e29a6ecd",
                    "canAppointmentNumber": 0
                }
            }
        },
        "B4": {
            "resource_id": "96683f3f-f53a-49d0-b38b-5eac5425155f",
            "slots": {
                "09:00": {
                    "id": "2f88f919-f8a9-4871-b807-2ae73bf369b8",
                    "canAppointmentNumber": 0
                },
                "10:00": {
                    "id": "72237fce-159c-489c-83e5-1e764eab1948",
                    "canAppointmentNumber": 0
                },
                "11:00": {
                    "id": "a7b7c4a7-3600-484c-8bdf-f5c56cf13005",
                    "canAppointmentNumber": 0
                },
                "12:00": {
                    "id": "ea61c833-319a-4328-9888-612e7f089069",
                    "canAppointmentNumber": 0
                },
                "13:00": {
                    "id": "cfd60f2e-6782-4f71-9411-bbe50d2b7eb8",
                    "canAppointmentNumber": 0
                },
                "14:00": {
                    "id": "ba686c7d-9176-4d84-96d7-6de7516c9a8d",
                    "canAppointmentNumber": 0
                },
                "15:00": {
                    "id": "895b410d-9104-409c-9608-a61a41802c70",
                    "canAppointmentNumber": 0
                },
                "16:00": {
                    "id": "5c9cfe6a-edf5-4d88-93c8-76fb92fd979f",
                    "canAppointmentNumber": 0
                },
                "17:00": {
                    "id": "42737154-177f-43a2-9c9c-cc054c434f5a",
                    "canAppointmentNumber": 0
                },
                "18:00": {
                    "id": "aa3d87c3-d84d-49f1-aff9-c73bf0c558c0",
                    "canAppointmentNumber": 0
                },
                "19:00": {
                    "id": "e8de36a7-4a80-4846-9628-8b7085ab2697",
                    "canAppointmentNumber": 0
                },
                "20:00": {
                    "id": "83671901-8769-4efe-99b3-72f086dc491a",
                    "canAppointmentNumber": 0
                }
            }
        }
    })

    async function fetchCourtInfo(timestamp) {
        // TODO 完善从API获取的部分
        const response = await getCourtInfo(timestamp)
        courtInfo.value = response.data

    }
    return { courtName, courtNo, timeSlot, fetchCourtInfo, courtInfo }
})