
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}

function query(entityType, delay = 600) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('OOOOPs')
            resolve(entities)
        }, delay)
    })
    return Promise.resolve(entities)
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

function _save(entityType, entities) {
    console.log('entities', entities)
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function postMany(entityType, newEntities) {
    return query(entityType)
        .then(entities => {
            newEntities = newEntities.map(entity => ({ ...entity, _id: _makeId() }))
            entities.push(...newEntities)
            _save(entityType, entities)
            return entities
        })
}

function _createUsers() {
    let users = [
        {
            "_id": "u101",
            "fullName": "gul071",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478540/users_profile/avatar-5c2c731e3a6438b9cb865b260c7fa1f2_aq92ga.jpg",
            "userName": "gul071",
            "password": "gul071",
            "email": "gul071@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u102",
            "fullName": "richarddavis438",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655479270/users_profile/avatar-901d8b9c355f662cd908ec1ee3234878_f2qrfp.jpg",
            "userName": "richarddavis438",
            "password": "richarddavis438",
            "email": "richarddavis438@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u103",
            "fullName": "courtney lasch",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655479271/users_profile/avatar-f99a5d03d32857b2b1e2c6f10c609e63_lcqowa.jpg",
            "userName": "courtney lasch",
            "password": "courtneylasch",
            "email": "courtneylasch@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u104",
            "fullName": "yogi_isnanda",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655479271/users_profile/avatar-339f789af3dc11f3311fb7f3fb0eb898_oerazm.jpg",
            "userName": "yogi_isnanda",
            "password": "yogi_isnanda",
            "email": "yogi_isnanda@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u105",
            "fullName": "buddhanthebeard",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655479271/users_profile/avatar-653088d14c8517d79a262f11b2dd26d9_waupaw.jpg",
            "userName": "buddhanthebeard",
            "password": "buddhanthebeard",
            "email": "buddhanthebeard@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u106",
            "fullName": "ivanrivera",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655479272/users_profile/avatar-16a726c23756f34fc0e52810dad3757d_g50yv1.jpg",
            "userName": "ivanrivera",
            "password": "ivanrivera",
            "email": "ivanrivera@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u107",
            "fullName": "graphexgalaxy",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655479273/users_profile/avatar-5abb03271d4613e5de0e307f55bf4531_v1rkhy.jpg",
            "userName": "graphexgalaxy",
            "password": "graphexgalaxy",
            "email": "graphexgalaxy@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u108",
            "fullName": "hp_spikefli",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655479274/users_profile/avatar-6f19eaea33540d5f458a3d362f6b6e68_nobs7g.jpg",
            "userName": "hp_spikefli",
            "password": "hp_spikefli",
            "email": "hp_spikefli@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u109",
            "fullName": "dohyotriyono",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655479274/users_profile/avatar-d807c7280712e97f797e7d2fb2606d66_bhjru0.jpg",
            "userName": "dohyotriyono",
            "password": "dohyotriyono",
            "email": "dohyotriyono@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u110",
            "fullName": "hp_spikefli",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655479274/users_profile/avatar-228a05c35c68d4e779b88d3945799bda_gurdmy.jpg",
            "userName": "hp_spikefli",
            "password": "hp_spikefli",
            "email": "hp_spikefli@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u111",
            "fullName": "gad_by_miraz_pro",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655479373/users_profile/avatar-1227ef866a336d11747b9c8d91ea5280_qbl1q7.jpg",
            "userName": "gad_by_miraz_pro",
            "password": "gad_by_miraz_pro",
            "email": "gad_by_miraz_pro@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u112",
            "fullName": "febzpena",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478524/users_profile/avatar-caeb316cc672607f7a978bff767236a3_xaohkf.jpg",
            "userName": "febzpena",
            "password": "febzpena",
            "email": "febzpena@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u113",
            "fullName": "shirley_esid",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478524/users_profile/avatar-25cd5199ca04c8e753d018a123de4f62_a03jwo.jpg",
            "userName": "shirley_esid",
            "password": "shirley_esid",
            "email": "shirley_esid@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u114",
            "fullName": "strongathome",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478525/users_profile/avatar-1b84c2291d1b5b135d1838b8fa386f07_nbyh0b.jpg",
            "userName": "strongathome",
            "password": "strongathome",
            "email": "strongathome@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u115",
            "fullName": "burnanaconcept",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478525/users_profile/avatar-0c5d9cdcef47dfb903f1fec00079cae5_p5lvuf.jpg",
            "userName": "burnanaconcept",
            "password": "burnanaconcept",
            "email": "burnanaconcept@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u116",
            "fullName": "roslyn_johnson",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478525/users_profile/avatar-f7a27c106e75351f9b4d309d54048046_gijaze.jpg",
            "userName": "roslyn_johnson",
            "password": "roslyn_johnson",
            "email": "roslyn_johnson@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u117",
            "fullName": "erichflaboss",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478528/users_profile/avatar-472f6e757c932d967c145a0648c11a55_jgz1vk.jpg",
            "userName": "erichflaboss",
            "password": "erichflaboss",
            "email": "erichflaboss@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u118",
            "fullName": "mahbuburrahm204",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478528/users_profile/avatar-9456094651945718abfe2da3a892ba5f_dbzzq2.jpg",
            "userName": "mahbuburrahm204",
            "password": "mahbuburrahm204",
            "email": "mahbuburrahm204@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u119",
            "fullName": "anxietybathbomb",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478528/users_profile/avatar-c00a9634ff58b67b25094f94c321a64c_qbi9ds.jpg",
            "userName": "anxietybathbomb",
            "password": "anxietybathbomb",
            "email": "anxietybathbomb@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u120",
            "fullName": "jaylucy",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478529/users_profile/avatar-692616f2977d8409b2ecfcc726444227_zoxujf.jpg",
            "userName": "jaylucy",
            "password": "jaylucy",
            "email": "jaylucy@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u121",
            "fullName": "pinkblack785",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478531/users_profile/avatar-68a0edb3ae94b8b1328120bf312f11ab_jzxpsz.jpg",
            "userName": "pinkblack785",
            "password": "pinkblack785",
            "email": "pinkblack785@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u122",
            "fullName": "hayleyhutson",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478531/users_profile/avatar-dbd5609e720fd1a4bbb461205de391f0_k8ihuh.jpg",
            "userName": "hayleyhutson",
            "password": "hayleyhutson",
            "email": "hayleyhutson@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u123",
            "fullName": "pjd2019",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478532/users_profile/avatar-d5c51a1480f96ad49ffaffadd0c0faa9_n6j9u8.jpg",
            "userName": "pjd2019",
            "password": "pjd2019",
            "email": "pjd2019@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u124",
            "fullName": "professorrose",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478531/users_profile/avatar-8c9b6540a72cbba4a5ca981d4b68fc8c_dno6ib.jpg",
            "userName": "professorrose",
            "password": "professorrose",
            "email": "professorrose@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u125",
            "fullName": "luizakipper",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478532/users_profile/avatar-d690dc0359d82605a8376a9f4e5e3334_avp0uc.jpg",
            "userName": "luizakipper",
            "password": "luizakipper",
            "email": "luizakipper@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u126",
            "fullName": "anamaldonado007",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478534/users_profile/avatar-bad77693e2e71a579075c390702797a7_kbvqzv.jpg",
            "userName": "anamaldonado007",
            "password": "anamaldonado007",
            "email": "anamaldonado007@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u127",
            "fullName": "truckparkermusi",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478534/users_profile/avatar-bad77693e2e71a579075c390702797a7_kbvqzv.jpg",
            "userName": "truckparkermusi",
            "password": "truckparkermusi",
            "email": "truckparkermusi@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u128",
            "fullName": "thisbmc",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478534/users_profile/avatar-259d81f4d89c69e5e3dbba40b4315834_qnlkyu.jpg",
            "userName": "thisbmc",
            "password": "thisbmc",
            "email": "thisbmc@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u129",
            "fullName": "arsal949",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478537/users_profile/avatar-c8f8fe1a00de297e1b6b635aed476a46_cfsxgd.jpg",
            "userName": "arsal949",
            "password": "arsal949",
            "email": "arsal949@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u130",
            "fullName": "urbanshamin",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478537/users_profile/avatar-ab5cc65154fa6d83103210ae0859f39c_r5uzho.jpg",
            "userName": "urbanshamin",
            "password": "urbanshamin",
            "email": "urbanshamin@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u131",
            "fullName": "daisyjasmeen",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478537/users_profile/avatar-4b08e4562f662d74cc5b52234fe1957c_ksmeaj.jpg",
            "userName": "daisyjasmeen",
            "password": "daisyjasmeen",
            "email": "daisyjasmeen@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u132",
            "fullName": "creativegig39",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478539/users_profile/avatar-17858b21de7447fac7a570527e25744c_qdzsdg.jpg",
            "userName": "creativegig39",
            "password": "creativegig39",
            "email": "creativegig39@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u133",
            "fullName": "tboytega",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478538/users_profile/avatar-2d6c74cfea39071d13f1baff2dc22232_lqshpj.jpg",
            "userName": "tboytega",
            "password": "tboytega",
            "email": "tboytega@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u134",
            "fullName": "mike5577",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478539/users_profile/avatar-053bf8f71592f855d2845704bb2f375d_n4pspi.jpg",
            "userName": "mike5577",
            "password": "mike5577",
            "email": "mike5577@gmail.com",
            "google_account": ""
        },
        {
            "_id": "u135",
            "fullName": "vodzmedias",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655478540/users_profile/avatar-5c2c731e3a6438b9cb865b260c7fa1f2_aq92ga.jpg",
            "userName": "vodzmedias",
            "password": "vodzmedias",
            "email": "vodzmedias@gmail.com",
            "google_account": ""
        }
    ]
    return users
}

function _createQuestions() {
    const questions = [
        {
            "id": "L107",
            "user_id": "U104",
            "title": "Board Games",
            "imgUrl": "https://res.cloudinary.com/michiko/image/upload/v1655474894/Avatars_animals_kknifj.jpg",
            "game_id": "G102",
            "questions": [
                {
                    "id": "Q161",
                    "type": "multiple",
                    "question": "Carcassonne is based on which French town?",
                    "correct_answer": "Carcassonne",
                    "incorrect_answers": [
                        "Paris",
                        "Marseille",
                        "Clermont-Ferrand"
                    ]
                },
                {
                    "id": "Q162",
                    "type": "boolean",
                    "question": "Snakes and Ladders was originally created in India?",
                    "correct_answer": "True",
                    "incorrect_answers": [
                        "False"
                    ]
                },
                {
                    "id": "Q163",
                    "type": "multiple",
                    "question": "How many dots are on a single die?",
                    "correct_answer": "21",
                    "incorrect_answers": [
                        "24",
                        "15",
                        "18"
                    ]
                },
                {
                    "id": "Q164",
                    "type": "boolean",
                    "question": "The Angry Video Game Nerd&#039;s alter ego is &quot;Board James&quot;.",
                    "correct_answer": "True",
                    "incorrect_answers": [
                        "False"
                    ]
                },
                {
                    "id": "Q165",
                    "type": "boolean",
                    "question": "There is a Donald Trump Board Game, which was made in 1989.",
                    "correct_answer": "True",
                    "incorrect_answers": [
                        "False"
                    ]
                },
                {
                    "id": "Q166",
                    "type": "multiple",
                    "question": "Which one of these is not a real game in the Dungeons &amp; Dragons series?",
                    "correct_answer": "Extreme Dungeons &amp; Dragons",
                    "incorrect_answers": [
                        "Advanced Dungeons &amp; Dragons",
                        "Dungeons &amp; Dragons 3.5th edition",
                        "Advanced Dungeons &amp; Dragons 2nd edition"
                    ]
                },
                {
                    "id": "Q167",
                    "type": "multiple",
                    "question": "The board game Monopoly takes its street names from which real American city?",
                    "correct_answer": "Atlantic City, New Jersey",
                    "incorrect_answers": [
                        "Las Vegas, Nevada",
                        "Duluth, Minnesota",
                        "Charleston, South Carolina"
                    ]
                },
                {
                    "id": "Q168",
                    "type": "multiple",
                    "question": "In which year was the pen and paper RPG &quot;Deadlands&quot; released?",
                    "correct_answer": "1996",
                    "incorrect_answers": [
                        "2003",
                        "1999",
                        "1993"
                    ]
                },
                {
                    "id": "Q169",
                    "type": "multiple",
                    "question": "When was the board game Twister, released to the public?",
                    "correct_answer": "April 1966",
                    "incorrect_answers": [
                        "September 1965",
                        "January 1969",
                        "February 1966"
                    ]
                },
                {
                    "id": "Q170",
                    "type": "multiple",
                    "question": "What is the maximum level you can have in a single class in Dungeons and Dragons (5e)?",
                    "correct_answer": "20",
                    "incorrect_answers": [
                        "30",
                        "15",
                        "25"
                    ]
                }
            ]
        }
    ]
    return questions
}