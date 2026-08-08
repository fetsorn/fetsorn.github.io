# API



All contours have the same representation as a list of lists with integers and have the following form:



## Processing of FUNDUS photos



``` rest

POST https://functions.yandexcloud.net/d4e5t0njkd4f1mb9kh5l

Content-Type: text/plain

Accept: */*



{

  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZldHNvcm5AZ21haWwuY29tIiwiaWF0IjoxNjI3MTMxMzgyfQ.CGQgvWOCcNBeo-AxTC1ApaJZZs1OKKEsM1ublnW679y4l78qjsebAtM1hD7Or5NrckZ29DwA8qmvZoJzjSfGrMJ3NrmnTHBVIx1EIx44IwZdJNPW6zXVrpTbyVL1gNyGrLS5FKVDh48lLANojMlg8zvOkQEMrgv440GG4LZubyj1APJ8m51Qm2uC_Nn0mgv-ooKoJHAQI8YCLDpCkXv2WMOVpMxgKOBX7iKknM8IYlh3oMNtIfxG5F4VeL_nYzIwIbbAZhtnvWJm-0bTbRhBk0FGDYYd2s8e2AZGPl5S7ZDU-RFU1Jau4czpUxt2dMuhve2acsVWnNxcKStU_M7bRZ6XJL9Nebme5-7iuejF8lpd2c1wBsecbTiF75b0GSagUJx3saeOumDlnGhQ-Y6Mo4dshfkPeAcMRhgo8l0-PJrh8LfbsrSjw2ywfpIE_k-kqV9PczIemFegMEcV_yHwN9iBqkD5900tXPA2nVpTQ_zeHb8rUkXf3jXh9WzUGHjkM1NMKv5L0SlQmcnLghv0qLCrqfGWrG0MJ6ZkTXZvi12kOcKCd88nJ8Li1RKVXE0pDNg7Mm5FoqIHDai_pO_bQjDusGMbp4PFamAHMgzuxqMD6tbs-oWhINID8ywnECMTnzHVzkegPz373x02dS0eMvf435YE_tT877M7fOy8L68",

    "image": ""

}

```





``` js

// POST https://functions.yandexcloud.net/d4e5t0njkd4f1mb9kh5l

// HTTP/1.1 401 Unauthorized

// Date: Fri, 23 Jun 2023 17:11:37 GMT

// Content-Length: 0

// Connection: keep-alive

// Access-Control-Allow-Origin: *

// Server: Yandex-Cloud-Functions/1.0

// X-Content-Type-Options: nosniff

// X-Function-Id: d4e5t0njkd4f1mb9kh5l

// X-Function-Version-Id: d4etbadc9vbndqjq61f8

// X-Request-Id: 4db12798-d24e-4062-9418-8777bdd7345a

// Request duration: 3.204405s

```





URL: https://functions.yandexcloud.net/d4e5t0njkd4f1mb9kh5l



Request headers:

Accept: */*

Content-Type: text/plain



Request fields:

token — string — user token;

image — string - data URL images в webp format



### Status 500 — server error



Response fields:

info — string — contains error description



### Status 401 — authorization error



### Status 200 — request processed successfully



Response fields:

`exudates_in_macula` — boolean — true — if there are exudates in the macula;

`exudates_in_fovea` — boolean — true — if there are hard exudates within a radius of 500 microns from the center of the macula (clinically significant macular edema);

`height` — int32 — image height;

`width` — int32 — image width;

`image` — string - data URL of image with preprocessing;

`macula` — list of float32 — list of macula parameters [x center, y center, diameter 500 microns from center in pixels, macula diameter in pixels, µm per pixel scale];

`hard_exudates` — list of int32 lists — outlines of hard exudates;

`intraretinal_hemorrhages` — list of int32 lists — contours of intraretinal hemorrhages;

`soft_exudates` — list of int32 lists — contours of soft exudates;

`fibrose` — list of int32 lists — fibrosis contours;

`laser` — list of int32 lists — contours of laser coagulates;

`microaneurysms` — list of int32 lists — contours of microaneurysms;

`neovascularization` — list of int32 lists — contours of neovascularization;

`preretinal` — list of int32 lists — contours of preretinal hemorrhages;

`va` — list of int32 lists — contours of venous anomalies.



## Processing of OCT



``` rest

POST https://functions.yandexcloud.net/d4e7i7f8odqn50mirlrm

Content-Type: text/plain

Accept: */*



{

  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZldHNvcm5AZ21haWwuY29tIiwiaWF0IjoxNjI3MTMxMzgyfQ.CGQgvWOCcNBeo-AxTC1ApaJZZs1OKKEsM1ublnW679y4l78qjsebAtM1hD7Or5NrckZ29DwA8qmvZoJzjSfGrMJ3NrmnTHBVIx1EIx44IwZdJNPW6zXVrpTbyVL1gNyGrLS5FKVDh48lLANojMlg8zvOkQEMrgv440GG4LZubyj1APJ8m51Qm2uC_Nn0mgv-ooKoJHAQI8YCLDpCkXv2WMOVpMxgKOBX7iKknM8IYlh3oMNtIfxG5F4VeL_nYzIwIbbAZhtnvWJm-0bTbRhBk0FGDYYd2s8e2AZGPl5S7ZDU-RFU1Jau4czpUxt2dMuhve2acsVWnNxcKStU_M7bRZ6XJL9Nebme5-7iuejF8lpd2c1wBsecbTiF75b0GSagUJx3saeOumDlnGhQ-Y6Mo4dshfkPeAcMRhgo8l0-PJrh8LfbsrSjw2ywfpIE_k-kqV9PczIemFegMEcV_yHwN9iBqkD5900tXPA2nVpTQ_zeHb8rUkXf3jXh9WzUGHjkM1NMKv5L0SlQmcnLghv0qLCrqfGWrG0MJ6ZkTXZvi12kOcKCd88nJ8Li1RKVXE0pDNg7Mm5FoqIHDai_pO_bQjDusGMbp4PFamAHMgzuxqMD6tbs-oWhINID8ywnECMTnzHVzkegPz373x02dS0eMvf435YE_tT877M7fOy8L68",

    "image": "a",

   "type": "image/png"

}

```



``` js

// POST https://functions.yandexcloud.net/d4e7i7f8odqn50mirlrm

// HTTP/1.1 401 Unauthorized

// Date: Fri, 23 Jun 2023 16:13:46 GMT

// Content-Length: 0

// Connection: keep-alive

// Access-Control-Allow-Origin: *

// Server: Yandex-Cloud-Functions/1.0

// X-Content-Type-Options: nosniff

// X-Function-Id: d4e7i7f8odqn50mirlrm

// X-Function-Version-Id: d4eo02fuiulg7pqichhs

// X-Request-Id: cc93593e-6331-4698-bd79-ebd53c3d3306

// Request duration: 2.938829s

```



URL: https://functions.yandexcloud.net/d4e7i7f8odqn50mirlrm



Request headers:

Accept: */*

Content-Type: text/plain



Request fields:

token — string — user token;

image — string - data URL of image in webp format;

type — string - image MIME type, e.g image/png, image/jpeg



### Status 500 — server error

Response fields:

info — string — contains error description



### Status 401 — authorization error



### Status 200 — request processed successfully

Response fields:

`Druzen` — list of int32 lists — contours of retinal drusen;

`Layer_Bruchs_membrane` — list of int32 lists — not used;

`Layer_Henle_fibers_outer_nuclear` — list of int32 lists — not used;

`Layer_RPE` — list of int32 lists — not used;

`Layer_RPE_and_Bruchs_membrane` — list of int32 lists — not used;

`Layer_ellipsoidal_zone_photoreceptors` — list of int32 lists — not used;

`Layer_ganglion_cells_internal_plexieforms` — list of int32 lists — not used;

`Layer_inner_nuclear` — list of int32 lists — not used;

`Layer_myoid_zone_photoreceptors` — list of int32 lists — not used;

`Layer_nerve_fibers` — list of int32 lists — not used;

`Layer_outer_boundary_membrane` — list of int32 lists — not used;

`Layer_outer_plexiform` — list of int32 lists — not used;

`Layer_outer_segments_photoreceptors` — list of int32 lists — not used;

`RPE_detachment` — list of int32 lists — contours of retinal pigment epithelium detachment;

`SHRM` — list of int32 lists — contours of subretinal hyperreflective material;

`epiretinal_fibrosis` — list of int32 lists — not used;

`full_macular_hole` — list of int32 lists — contours of a through macular hole;

`height` — int32 — image height;

`intraretinal_cyst` — list of int32 lists — contours of intraretinal cysts;

`lamellar_macular_hole` -  list of int32 lists — contours of lamellar macular hole;

`subretinal_fluid` — list of int32 lists — subretinal fluid contours;

`vmt` — list of int32 lists — vitreomacular traction contours;

`width` — int32 — image width;



## Sign up



``` rest

POST https://functions.yandexcloud.net/d4esr6ie5khkuno72hib

Content-Type: text/plain



{

    "op": "register",

    "email": "",

    "password": "",

    "first_name": "",

    "last_name": "",

    "middle_name": "",

    "country": "",

    "city": "",

    "organization": "",

    "profession": "Researcher",

    "promocode": "",

    "language": "en",

    "domain": "com",

    "name": "",

    "real_name": ""

}

```





``` js

{

  "ok": true

}

// POST https://functions.yandexcloud.net/d4esr6ie5khkuno72hib

// HTTP/1.1 200 OK

// Date: Fri, 23 Jun 2023 17:09:49 GMT

// Content-Type: application/json

// Content-Length: 11

// Connection: keep-alive

// Access-Control-Allow-Origin: *

// Server: Yandex-Cloud-Functions/1.0

// X-Content-Type-Options: nosniff

// X-Function-Id: d4esr6ie5khkuno72hib

// X-Function-Version-Id: d4eh53g2gb4s7m9ugdqj

// X-Request-Id: 7da71136-efbb-47fb-9dd6-614e2ccfd5b9

// Request duration: 3.835323s

```



URL: https://functions.yandexcloud.net/d4esr6ie5khkuno72hib



Request headers:

Accept: */*

Content-Type: text/plain



Request fields:

`op` — string - always equals "register";

`email` — string - must be not empty, user email;

`password` — string - must be not empty, password;

`first_name` — string - must be not empty, name;

`last_name` — string - must be not empty, surname;

`middle_name` — string - may be empty, middle name;

`country` — string - must be not empty, country, always in English, from the Countries list;

`city` — string - must be not empty, city;

`organization` — string - must be not empty, organization name;

`profession` — string - must be not empty, profession, always in english, from the Professions list;

`promocode` — string - promocode input by the user or an empty string;

`language` — string - two-letter language code, e.g. "ru", "en";

`domain` — string - always "com";

`name` — string - always empty string;

`real_name` — string — always empty string.



### Status 500 — server error

Response fields:

info — string — contains error description



### Status 200 — request processed successfully

Response fields:

ok — boolean — true — if registration is successful, false — if user already exists.



## Log in



``` rest

POST https://functions.yandexcloud.net/d4esr6ie5khkuno72hib

Content-Type: text/plain



{

    "op": "login",

    "email": "",

    "password": ""

}

```





``` js

{

  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZldHNvcm5AZ21haWwuY29tIiwiaWF0IjoxNjI3MTMxMzgyfQ.CGQgvWOCcNBeo-AxTC1ApaJZZs1OKKEsM1ublnW679y4l78qjsebAtM1hD7Or5NrckZ29DwA8qmvZoJzjSfGrMJ3NrmnTHBVIx1EIx44IwZdJNPW6zXVrpTbyVL1gNyGrLS5FKVDh48lLANojMlg8zvOkQEMrgv440GG4LZubyj1APJ8m51Qm2uC_Nn0mgv-ooKoJHAQI8YCLDpCkXv2WMOVpMxgKOBX7iKknM8IYlh3oMNtIfxG5F4VeL_nYzIwIbbAZhtnvWJm-0bTbRhBk0FGDYYd2s8e2AZGPl5S7ZDU-RFU1Jau4czpUxt2dMuhve2acsVWnNxcKStU_M7bRZ6XJL9Nebme5-7iuejF8lpd2c1wBsecbTiF75b0GSagUJx3saeOumDlnGhQ-Y6Mo4dshfkPeAcMRhgo8l0-PJrh8LfbsrSjw2ywfpIE_k-kqV9PczIemFegMEcV_yHwN9iBqkD5900tXPA2nVpTQ_zeHb8rUkXf3jXh9WzUGHjkM1NMKv5L0SlQmcnLghv0qLCrqfGWrG0MJ6ZkTXZvi12kOcKCd88nJ8Li1RKVXE0pDNg7Mm5FoqIHDai_pO_bQjDusGMbp4PFamAHMgzuxqMD6tbs-oWhINID8ywnECMTnzHVzkegPz373x02dS0eMvf435YE_tT877M7fOy8L68",

  "confirmed": true

}

// POST https://functions.yandexcloud.net/d4esr6ie5khkuno72hib

// HTTP/1.1 200 OK

// Date: Fri, 23 Jun 2023 17:13:36 GMT

// Content-Type: application/json

// Content-Length: 812

// Connection: keep-alive

// Vary: Accept-Encoding

// Access-Control-Allow-Origin: *

// Server: Yandex-Cloud-Functions/1.0

// X-Content-Type-Options: nosniff

// X-Function-Id: d4esr6ie5khkuno72hib

// X-Function-Version-Id: d4eh53g2gb4s7m9ugdqj

// X-Request-Id: a5e8352a-427e-4edb-b431-c2eed849804d

// Request duration: 1.201843s

```



    "password": "G3jbME5UTjmPRV"

    "password": "we28*3sjUBG!uB"





``` js

{

  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZldHNvcm5AZ21haWwuY29tIiwiaWF0IjoxNjI3MTMxMzgyfQ.CGQgvWOCcNBeo-AxTC1ApaJZZs1OKKEsM1ublnW679y4l78qjsebAtM1hD7Or5NrckZ29DwA8qmvZoJzjSfGrMJ3NrmnTHBVIx1EIx44IwZdJNPW6zXVrpTbyVL1gNyGrLS5FKVDh48lLANojMlg8zvOkQEMrgv440GG4LZubyj1APJ8m51Qm2uC_Nn0mgv-ooKoJHAQI8YCLDpCkXv2WMOVpMxgKOBX7iKknM8IYlh3oMNtIfxG5F4VeL_nYzIwIbbAZhtnvWJm-0bTbRhBk0FGDYYd2s8e2AZGPl5S7ZDU-RFU1Jau4czpUxt2dMuhve2acsVWnNxcKStU_M7bRZ6XJL9Nebme5-7iuejF8lpd2c1wBsecbTiF75b0GSagUJx3saeOumDlnGhQ-Y6Mo4dshfkPeAcMRhgo8l0-PJrh8LfbsrSjw2ywfpIE_k-kqV9PczIemFegMEcV_yHwN9iBqkD5900tXPA2nVpTQ_zeHb8rUkXf3jXh9WzUGHjkM1NMKv5L0SlQmcnLghv0qLCrqfGWrG0MJ6ZkTXZvi12kOcKCd88nJ8Li1RKVXE0pDNg7Mm5FoqIHDai_pO_bQjDusGMbp4PFamAHMgzuxqMD6tbs-oWhINID8ywnECMTnzHVzkegPz373x02dS0eMvf435YE_tT877M7fOy8L68",

  "confirmed": true

}

// POST https://functions.yandexcloud.net/d4esr6ie5khkuno72hib

// HTTP/1.1 200 OK

// Date: Fri, 23 Jun 2023 16:10:50 GMT

// Content-Type: application/json

// Content-Length: 812

// Connection: keep-alive

// Vary: Accept-Encoding

// Access-Control-Allow-Origin: *

// Server: Yandex-Cloud-Functions/1.0

// X-Content-Type-Options: nosniff

// X-Function-Id: d4esr6ie5khkuno72hib

// X-Function-Version-Id: d4eh53g2gb4s7m9ugdqj

// X-Request-Id: 30e14784-ed10-43d5-b08e-dded2bfba63f

// Request duration: 0.923204s

```







URL: https://functions.yandexcloud.net/d4esr6ie5khkuno72hib



Request headers:

Accept: */*

Content-Type: text/plain



Request fields:

op — string - always equals "login";

email — string - must be not empty;

password — string - must be not empty;



### Status 500 — server error

Response fields:

info — string — contains error description



### Status 401 — authorization error



### Status 200 — request processed successfully

Response fields:

token — string — user token

confirmed — boolean — true — if user confirmed email, false - if user did not confirm email

and when we send an empty `login` and `password`, we also get a status of 200 and `confirmed` will be false with `token`.



## Get user information



``` rest

POST https://functions.yandexcloud.net/d4esr6ie5khkuno72hib

Content-Type: text/plain



{

    "op": "get_info",

  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZldHNvcm5AZ21haWwuY29tIiwiaWF0IjoxNjI3MTMxMzgyfQ.CGQgvWOCcNBeo-AxTC1ApaJZZs1OKKEsM1ublnW679y4l78qjsebAtM1hD7Or5NrckZ29DwA8qmvZoJzjSfGrMJ3NrmnTHBVIx1EIx44IwZdJNPW6zXVrpTbyVL1gNyGrLS5FKVDh48lLANojMlg8zvOkQEMrgv440GG4LZubyj1APJ8m51Qm2uC_Nn0mgv-ooKoJHAQI8YCLDpCkXv2WMOVpMxgKOBX7iKknM8IYlh3oMNtIfxG5F4VeL_nYzIwIbbAZhtnvWJm-0bTbRhBk0FGDYYd2s8e2AZGPl5S7ZDU-RFU1Jau4czpUxt2dMuhve2acsVWnNxcKStU_M7bRZ6XJL9Nebme5-7iuejF8lpd2c1wBsecbTiF75b0GSagUJx3saeOumDlnGhQ-Y6Mo4dshfkPeAcMRhgo8l0-PJrh8LfbsrSjw2ywfpIE_k-kqV9PczIemFegMEcV_yHwN9iBqkD5900tXPA2nVpTQ_zeHb8rUkXf3jXh9WzUGHjkM1NMKv5L0SlQmcnLghv0qLCrqfGWrG0MJ6ZkTXZvi12kOcKCd88nJ8Li1RKVXE0pDNg7Mm5FoqIHDai_pO_bQjDusGMbp4PFamAHMgzuxqMD6tbs-oWhINID8ywnECMTnzHVzkegPz373x02dS0eMvf435YE_tT877M7fOy8L68"

}

```





``` text

{"accepted_license":true,"accepted_oct_license":false,"access_level_fundus":null,"access_level_oct":null,"can_use_admin":false,"can_use_amd_dry_form_trainer":null,"can_use_clinical_classification_amd_trainer":null,"can_use_cnv_trainer":null,"can_use_dme_trainer":null,"can_use_fundus":false,"can_use_fundus_dynamic_monitoring":true,"can_use_fundus_self_test":null,"can_use_oct":false,"can_use_oct_dynamic_monitoring":true,"can_use_oct_self_test":null,"can_use_trainer":true,"city":"","confirmed":true,"country":"Russia","domain":null,"email":"fetsorn@gmail.com","first_name":"Anton","fundus_processed_per_day":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"fundus_processed_per_month":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"fundus_processed_per_year":[0],"fundus_visits_per_day":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"fundus_visits_per_month":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"fundus_visits_per_year":[0],"id":"1630146849qgUUo","language":"ru","last_activity":"2023-06-23","last_name":"Davydov","middle_name":"","name":"","oct_processed_per_day":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"oct_processed_per_month":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"oct_processed_per_year":[0],"oct_visits_per_day":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"oct_visits_per_month":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"oct_visits_per_year":[0],"organization":"fetsorn","profession":"Researcher","promocodes":[],"real_name":"Anton Davydov","reg_date":"2021-07-24","tele_token":null,"trainer_visits_per_day":[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"trainer_visits_per_month":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],"trainer_visits_per_year":[1],"reviews_per_day":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"reviews_per_month":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"reviews_per_year":[0],"uploaded_per_day":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"uploaded_per_month":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"uploaded_per_year":[0],"reported_per_day":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"reported_per_month":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"reported_per_year":[0]}

POST https://functions.yandexcloud.net/d4esr6ie5khkuno72hib

HTTP/1.1 200 OK

Date: Fri, 23 Jun 2023 16:13:01 GMT

Content-Type: text/plain; charset=utf-8

Content-Length: 2320

Connection: keep-alive

Vary: Accept-Encoding

Access-Control-Allow-Origin: *

Server: Yandex-Cloud-Functions/1.0

X-Content-Type-Options: nosniff

X-Function-Id: d4esr6ie5khkuno72hib

X-Function-Version-Id: d4eh53g2gb4s7m9ugdqj

X-Request-Id: 504b0a3d-6556-4217-b4ad-3173d259944f

Request duration: 1.312458s

```



URL: https://functions.yandexcloud.net/d4esr6ie5khkuno72hib



Request headers:

Accept: */*

Content-Type: text/plain



Request fields:

op — string - always equals "get_info";

token — string — user token.



### Status 500 — server error

Response fields:

info — string — contains error description



### Status 401 — authorization error



### Status 200 — request processed successfully



Response fields:

`accepted_license` - boolean - true - if the user accepted the agreement to use fundus photo processing;

`accepted_oct_license` - boolean - true - if the user accepted the agreement to use OCT processing;

`can_use_admin` - boolean - true - if the user is an administrator;

`can_use_fundus` - boolean - true - can use fundus photo processing;

`can_use_oct` - boolean - true - can use OCT processing;

`can_use_trainer` - boolean - true - can use the trainer;

`city` — string - name of the user’s city;

`confirmed` - boolean - true - if the user confirmed the email, false - if he did not;

`country` — string - country name;

`domain` — string - the domain from which the user registered;

`email` - string - user email;

`first_name` — string - user name;

`fundus_processed_per_day` - int32 list - number of processed fundus photos by day;

`fundus_processed_per_month` - int32 list - number of processed fundus photos by month;

`fundus_processed_per_year` - int32 list - number of processed fundus photos by year;

`fundus_visits_per_day` - int32 list - number of visits to the fundus photo processing page by day;

`fundus_visits_per_month` - list int32 - number of visits to the fundus photo processing page by month;

`fundus_visits_per_year` - int32 list - number of visits to the fundus photo processing page by year;

`id` — string - user id in the database;

`last_activity` — string - date of last activity;

`last_name` — string - user’s last name;

`middle_name` — string - user’s middle name;

`name` — string - user name (not used);

`oct_processed_per_day` — int32 list — number of processed OCT scans by day;

`oct_processed_per_month` - int32 list - number of processed OCT scans by month;

`oct_processed_per_year` — int32 list - number of processed OCT scans by year;

`oct_visits_per_day` - int32 list - number of visits to the OCT processing page by day;

`oct_visits_per_month` — int32 list - number of visits to the OCT processing page by month;

`oct_visits_per_year` - int32 list - number of visits to the OCT processing page by year;

`organization` - string - name of the user's organization;

`profession` — string - user’s profession;

`promocodes` - list of strings - list of user promotional codes;

`real_name` — string - full user name (not used);

`reg_date` — string - registration date;

`reported_per_day` — int32 list — number of error messages by day;

`reported_per_month` - int32 list - number of error messages by month;

`reported_per_year` - int32 list - number of error messages by year;

`reviews_per_day` - int32 list - number of reviews sent by day;

`reviews_per_month` - int32 list - number of reviews sent by month;

`reviews_per_year` - int32 list - number of reviews sent by year;

`trainer_visits_per_day` - int32 list - number of visits to the simulator by day;

`trainer_visits_per_month` - int32 list - number of visits to the simulator by month;

`trainer_visits_per_year` - int32 list - number of visits to the simulator by year;

`uploaded_per_day` - int32 list - number of donated photos by day;

`uploaded_per_month` - int32 list - number of donated photos by month;

`uploaded_per_year` - int32 list - number of donated photos by year.



## Sending feedback



URL: https://functions.yandexcloud.net/d4esr6ie5khkuno72hib



Request headers:

Accept: */*

Content-Type: text/plain



Request fields:

op — string - always "problem";

token — string — user token;

text — string - error message;

language — string - two-letter language code, e.g. "ru", "en";

domain — string - always "com".



### Status 500 — server error

Response fields:

info — string — contains error description



### Status 401 — authorization error



### Status 200 — request processed successfully



## Sending a review



URL: https://functions.yandexcloud.net/d4esr6ie5khkuno72hib



Request headers:

Accept: */*

Content-Type: text/plain



Request fields:

op — string - always "add_review";

token — string — user token;

text — string - error message;

grade — int32 — amount of stars in review, 0 to 5.



### Status 500 — server error

Response fields:

info — string — contains error description



### Status 401 — authorization error



### Status 200 — request processed successfully



## Getting list of reviews



URL: https://functions.yandexcloud.net/d4esr6ie5khkuno72hib



Request headers:

Accept: */*

Content-Type: text/plain



Request fields:

op — string - always "get_visible_review_list";

token — string — user token;



### Status 500 — server error

Response fields:

info — string — contains error description



### Status 401 — authorization error



### Status 200 — request processed successfully



Response fields:

`city` — string - city of user that gave the review;

`country` — string - country of user that gave the review;

`first_name` — string - name;

`grade` — amount of stars in review, 0 to 5;

`id` — string -  id of review in the database;

`last_name` — string - surname;

`middle_name` — string - middle naame (may be empty);

`organization` — string - organization name;

`profession` — string - profession, always in english, from the Professions list;

`send_date` — string - date when the review was sent;

`show` — boolean — true — whether to show the review on screen;

`text` — string - text of the review;



## Countries list



 - Abkhazia

 - Afghanistan

 - Albania

 - Algeria

 - Andorra

 - Angola

 - Anguilla

 - Antigua and Barbuda

 - Antilles

 - Argentina

 - Armenia

 - Australia

 - Austria

 - Azerbaijan

 - Bahamas

 - Bahrain

 - Bangladesh

 - Barbados

 - Belarus

 - Belgium

 - Belize

 - Benin

 - Bermuda

 - Bolivia

 - Bosnia and Herzegovina

 - Botswana

 - Brazil

 - British virgin islands

 - Brunei

 - Bulgaria

 - Burkina Faso

 - Burundi

 - Butane

 - Cambodia

 - Cameroon

 - Canada

 - Cape Verde

 - Chad

 - Chile

 - China

 - Colombia

 - Congo, Democratic Republic

 - Congo

 - Cook Islands

 - Costa Rica

 - Croatia

 - Cuba

 - Cyprus

 - Czech

 - Denmark

 - Djibouti

 - Dominican Republic

 - Ecuador

 - Egypt

 - Equatorial Guinea

 - Eritrea

 - Estonia

 - Ethiopia

 - Faroe Island

 - Fiji

 - Finland

 - France

 - French Polynesia

 - Gabon

 - Gambia

 - Georgia

 - Germany

 - Ghana

 - Gibraltar

 - Greece

 - Greenland

 - Grenada

 - Guadeloupe

 - Guatemala

 - Guernesey

 - Guinea-Bissau

 - Guinea

 - Guyana

 - Haiti

 - Honduras

 - Hong Kong

 - Hungary

 - Iceland

 - India

 - Indonesia

 - Iran

 - Iraq

 - Ireland

 - Isle of Man

 - Israel

 - Italy

 - Ivory Coast

 - Jamaica

 - Japan

 - Jersey

 - Jordan

 - Kazakhstan

 - Kenya

 - Kuwait

 - Kyrgyzstan

 - Laos

 - Latvia

 - Lebanon

 - Lesotho

 - Liberia

 - Libya

 - Liechtenstein

 - Lithuania

 - Luxembourg

 - Macedonia

 - Madagascar

 - Malawi

 - Malaysia

 - Maldives

 - Mali

 - Malta

 - Mauritania

 - Mauritius

 - Mexico

 - Moldova

 - Monaco

 - Mongolia

 - Montenegro

 - Morocco

 - Mozambique

 - Myanmar

 - Namibia

 - Nepal

 - Netherlands

 - New Caledonia

 - New Zealand

 - Nicaragua

 - Niger

 - Nigeria

 - North Korea

 - Norway

 - Oman

 - Pakistan

 - Palau

 - Panama

 - Papua New Guinea

 - Paraguay

 - Peru

 - Philippines

 - Pitcairn Islands

 - Poland

 - Portugal

 - Puerto Rico

 - Qatar

 - Romania

 - Russia

 - Rwanda

 - Réunion

 - Saint Kitts and Nevis

 - Saint Lucia

 - Saint Pierre and Miquelon

 - Saint Vincent and the Grenadines

 - Salvador

 - Samoa

 - San Marino

 - Sao Tome and Principe

 - Saudi Arabia

 - Senegal

 - Serbia

 - Seychelles

 - Sierra Leone

 - Singapore

 - Slovakia

 - Slovenia

 - Solomon Islands

 - Somalia

 - South Africa

 - South Korea

 - South Ossetia

 - Spain

 - Sri Lanka

 - State of Palestine

 - Sudan

 - Suriname

 - Swaziland

 - Sweden

 - Switzerland

 - Syria

 - Taiwan

 - Tajikistan

 - Tanzania

 - Thailand

 - Togo

 - Tokelau

 - Tonga

 - Trinidad and Tobago

 - Tunisia

 - Turkey

 - Turkmenistan

 - Turks and Caicos Islands

 - Tuvalu

 - USA

 - Uganda

 - Ukraine

 - United Arab Emirates

 - United Kingdom

 - Uruguay

 - Uzbekistan

 - Vanuatu

 - Vatican

 - Venezuela

 - Vietnam

 - Wallis and Futuna

 - Western Sahara

 - Yemen

 - Zambia

 - Zimbabwe



## Professions list



 - General Practitioner

 - Ophthalmologist

 - Endocrinologist

 - Optometrist

 - Another Doctor

 - Medical Representative

 - Healthcare Organizer

 - Lecturer

 - Student

 - Researcher

 - Other

