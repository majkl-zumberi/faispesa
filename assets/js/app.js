var db = firebase.firestore();
var location2 = window.location.pathname.split('/');
//var counter2 = location2.length - 1;
if (location2[2] == 'index.html' || location[2] == '') {
    var btnSignUp = document.getElementById("createNewAccount");
    btnSignUp.addEventListener("click", () => {
        console.log("pronto per creare account!");
        const nome_cognome=document.getElementById("nome_cognome_newUser").value;
        const emailNewUser = document.getElementById("emailNewUser").value;
        const passNewUser = document.getElementById("passNewUser").value;
        if (Boolean(emailNewUser) && Boolean(passNewUser)) {
            firebase.auth().createUserWithEmailAndPassword(emailNewUser, passNewUser)
                .then(function () {
                    console.log("hooray! user created");
                    UIkit.notification("Creazione account avvenuta con successo!", {
                        pos: 'bottom-right'
                    });
                    var user = firebase.auth().currentUser;
                    user.updateProfile({
                        displayName: nome_cognome
                    }).then(function () {
                        // Update successful.
                        UIkit.notification({
                            message: 'info aggiornate con successo!',
                            pos: 'bottom-right'
                        }, {
                            status: 'success'
                        })
                        var username = document.getElementById("user-name").innerHTML = response;
                    }).catch(function (error) {
                        // An error happened.
                        UIkit.notification({
                            message: 'info non aggiornate:' + error,
                            pos: 'bottom-right'
                        }, {
                            status: 'danger'
                        })
                    });
                })
                .catch(function (error) {
                    // Handle Errors here.
                    UIkit.notification("errore: " + error.message, {
                        pos: 'bottom-right'
                    })
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                });
        }else{
            UIkit.notification({
                message: 'form non corretta',
                pos: 'bottom-right',status: 'danger'
            })
        }

    });
}else if(location2[2] == 'user.html'){
    var btnAddNewList = document.getElementById("addNewTag");
btnAddNewList.addEventListener("click", function () {
    console.log("pronto per aggiungere una nuova lista:");
    var list = UIkit.modal.prompt('Nome tag:', 'inserisci il un nuovo tag').then(function (response) {
        console.log(response);

        console.log(response != 'inserisci il un nuovo tag');
        if (response == null) {
            UIkit.notification({
                message: 'operazione annullata',
                pos: 'bottom-right'
            }, {
                status: 'success'
            })
        } else if (response != 'inserisci il un nuovo tag' && response != '' && email != '') {
            var docRef = db.collection("tag").doc(email);

            docRef.get().then(function (doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data().name);
                    db.collection("tag").doc(email).set({
                            name: doc.data().name + response + "§"
                        })
                        .then(function () {
                            console.log("Document successfully written!");
                            UIkit.notification({
                                message: 'tag Aggiunto con successo!',
                                pos: 'bottom-right'
                            })
                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                            UIkit.notification({
                                message: 'errore:' + error,
                                pos: 'bottom-right'
                            })
                        });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    db.collection("tag").doc(email).set({
                            name: response,
                        })
                        .then(function () {
                            console.log("Document successfully written!");
                            UIkit.notification({
                                message: 'tag Aggiunto con successo!',
                                pos: 'bottom-right'
                            })
                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                            UIkit.notification({
                                message: 'errore:' + error,
                                pos: 'bottom-right'
                            })
                        });
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
                UIkit.notification({
                    message: 'errore: ' + error,
                    pos: 'bottom-right'
                })
            });


        } else {
            UIkit.notification({
                message: 'inserire nome tag valido',
                pos: 'bottom-right'
            }, {
                status: 'danger'
            })
        }

    });
});
var btnUpdateInfo = document.getElementById("update");

btnUpdateInfo.addEventListener("click", function () {
    document.getElementById("profile").click();
    var person = UIkit.modal.prompt('Nome e cognome:', 'inserisci il tuo nome').then(function (response) {
        console.log(response);

        console.log(response != 'inserisci il tuo nome');
        if (response == null) {
            UIkit.notification({
                message: 'operazione annullata',
                pos: 'bottom-right'
            }, {
                status: 'success'
            })
        } else if (response != 'inserisci il tuo nome' && response != '') {
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: response
            }).then(function () {
                // Update successful.
                UIkit.notification({
                    message: 'info aggiornate con successo!',
                    pos: 'bottom-right'
                }, {
                    status: 'success'
                })
                var username = document.getElementById("user-name").innerHTML = response;
            }).catch(function (error) {
                // An error happened.
                UIkit.notification({
                    message: 'info non aggiornate:' + error,
                    pos: 'bottom-right'
                }, {
                    status: 'danger'
                })
            });
        } else {
            UIkit.notification({
                message: 'inserire nome e cognome validi',
                pos: 'bottom-right'
            }, {
                status: 'danger'
            })
        }

    });
});
var counter = 0;
var btnAddList = document.getElementById("addList");
btnAddList.addEventListener("click", function () {
    restoreModalButtons();
    counter++;
    if (counter == 1) {
        console.log("clicked! bottone per aggiungere la spesa");

        var docRef = db.collection("tag").doc(email);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data().name);
                var listTag = document.getElementById("list-tag-load-db");
                while (listTag.hasChildNodes()) {
                    listTag.removeChild(listTag.lastChild);
                }
                var liElement1 = document.createElement("li");
                liElement1.setAttribute("class", "uk-active");
                var liElement2 = document.createElement("li");
                liElement2.setAttribute("id", "addtags");
                var liElement3 = document.createElement("li");
                liElement3.setAttribute("class", "uk-nav-header");
                var liElement4 = document.createElement("li");
                var liText1 = document.createTextNode("TAG");
                var liText2 = document.createTextNode("Aggiungi nuovo tag");
                var liText3 = document.createTextNode("Tag:");
                var liText4 = document.createTextNode("rimuovi tutti i tag");
                liElement1.appendChild(document.createElement("a").appendChild(liText1));
                var atag = document.createElement("a");
                atag.setAttribute("id", "addNewTag");
                atag.appendChild(liText2);
                var aRmTag = document.createElement("a");
                aRmTag.setAttribute("id", "rmTag");
                aRmTag.appendChild(liText4);
                liElement2.appendChild(atag);
                liElement3.appendChild(liText3);
                liElement4.appendChild(aRmTag);
                listTag.appendChild(liElement1);
                listTag.appendChild(liElement2);
                listTag.appendChild(liElement4);
                listTag.appendChild(liElement3);

                /**
                      * <li class="uk-active"><a href="#">TAG</a></li>
                                 <li><a id="addNewTag">Aggiungi tag</a></li>
                                 <li><a id="rmTag">rimuovi tag</a></li>
                                 <li class="uk-nav-header">Tag  aggiunti</li>
                      */
                var btnRemTag = document.getElementById("rmTag");
                btnRemTag.addEventListener("click", function () {
                    console.log("hai cliccato il bottone per rimuovere tutti i tag!");
                    UIkit.modal.confirm('Confermi di rimuovere tutti i tag? azione irreversibile').then(function () {
                        console.log('Confirmed rmTag.');
                        db.collection("tag").doc(email).delete().then(function () {
                            console.log("Document successfully deleted! tags removed");
                            UIkit.notification("tags rimossi con successo!", {
                                pos: 'bottom-right'
                            })

                            //mettere qui toast 
                            //adesso rimuovo i tag della sessione
                            const listTag = document.getElementById("list-tag-load-db");
                            while (listTag.hasChildNodes()) {
                                listTag.removeChild(listTag.lastChild);
                            }
                            //reload page

                            setInterval(function () {
                                window.location.href = "user.html";
                            }, 2000);
                        }).catch(function (error) {
                            console.error("Error removing document: ", error);
                        });
                    }, function () {
                        console.log('Rejected rmTag.');
                        UIkit.notification("operazione annullata", {
                            pos: 'bottom-right'
                        });
                    });
                });
                var token = doc.data().name.split("§");
                token.forEach(element => {
                    if (element != '') {
                        console.log(element);
                        //<li id="nomeLista" class="hasPointer">nome lista</li>

                        var nodeElement = document.createElement("li");
                        nodeElement.setAttribute("id", element.trim());
                        nodeElement.setAttribute("class", "hasPointer");
                        var nodeText = document.createTextNode(element);
                        nodeElement.appendChild(nodeText);
                        listTag.appendChild(nodeElement);
                        var hrElement = document.createElement("hr");
                        hrElement.setAttribute("id", element);
                        listTag.appendChild(hrElement);
                        var listener = document.getElementById(element.trim()).addEventListener("click", function () {
                            console.log("hai cliccato: " + element + " pronto per interagire con db");
                            var container = document.getElementById("flex-tags");
                            var btnTag = document.createElement("a");
                            btnTag.setAttribute("class", "tag");
                            var btnAdd = document.createElement("i");
                            btnAdd.setAttribute("class", "far fa-times-circle hasPointer");
                            var btnTagText = document.createTextNode(element + " ");
                            btnTag.appendChild(btnTagText);
                            btnTag.appendChild(btnAdd);
                            btnTag.addEventListener("click", function () {
                                console.log("hai cliccato i tag arancioni");
                                showTagList(element);
                                btnTag.remove();

                            });
                            container.appendChild(btnTag);
                            //  listTag.removeChild(nodeElement);
                            //  listTag.removeChild(hrElement);
                            nodeElement.style.display = 'none';
                            hrElement.style.display = 'none';
                        });


                        var btnAddNewList = document.getElementById("addNewTag");
                        btnAddNewList.addEventListener("click", function () {
                            console.log("pronto per aggiungere una nuova lista:");
                            var list = UIkit.modal.prompt('Nome tag:', '').then(function (response) {
                                console.log(response);

                                console.log(response != 'inserisci il un nuovo tag');
                                if (response == null) {
                                    UIkit.notification({
                                        message: 'operazione annullata',
                                        pos: 'bottom-right'
                                    }, {
                                        status: 'success'
                                    })
                                } else if (response != 'inserisci il un nuovo tag' && response != '' && email != '') {
                                    var docRef = db.collection("tag").doc(email);

                                    docRef.get().then(function (doc) {
                                        if (doc.exists) {
                                            console.log("Document data:", doc.data().name);
                                            db.collection("tag").doc(email).set({
                                                    name: doc.data().name + response + "§"
                                                })
                                                .then(function () {
                                                    console.log("Document successfully written!");
                                                    UIkit.notification({
                                                        message: 'tag Aggiunto con successo!',
                                                        pos: 'bottom-right'
                                                    })
                                                    insertTag(response);


                                                })
                                                .catch(function (error) {
                                                    console.error("Error writing document: ", error);
                                                    UIkit.notification({
                                                        message: 'errore:' + error,
                                                        pos: 'bottom-right'
                                                    })
                                                });
                                        } else {
                                            // doc.data() will be undefined in this case
                                            console.log("No such document!");
                                            db.collection("tag").doc(email).set({
                                                    name: response + "§",
                                                })
                                                .then(function () {
                                                    console.log("Document successfully written!");
                                                    UIkit.notification({
                                                        message: 'tag Aggiunto con successo!',
                                                        pos: 'bottom-right'
                                                    })
                                                    insertTag(response);


                                                })
                                                .catch(function (error) {
                                                    console.error("Error writing document: ", error);
                                                    UIkit.notification({
                                                        message: 'errore:' + error,
                                                        pos: 'bottom-right'
                                                    })
                                                });
                                        }
                                    }).catch(function (error) {
                                        console.log("Error getting document:", error);
                                        UIkit.notification({
                                            message: 'errore: ' + error,
                                            pos: 'bottom-right'
                                        })
                                    });


                                } else {
                                    UIkit.notification({
                                        message: 'inserire nome tag valido',
                                        pos: 'bottom-right'
                                    }, {
                                        status: 'danger'
                                    })
                                }

                            });
                        });
                    }

                });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }


});



var tagDropDownBtn = document.getElementById("show-tag-dropdown");
tagDropDownBtn.addEventListener("click", function () {
    console.log("hai aperto il dropdown dei tag!");

});

function showTagList(nomeTag) {
    //"[id='a b']"
    document.querySelectorAll("[id='" + nomeTag + "'" + "]").forEach(element => {
        console.log("entrato nella funzione e nel query selector");
        element.style.display = '';
    })

}


var btnAddNewList = document.getElementById("addNewTag");
btnAddNewList.addEventListener("click", function () {
    console.log("pronto per aggiungere una nuova lista:");
    var list = UIkit.modal.prompt('Nome tag:', '').then(function (response) {
        console.log(response);

        console.log(response != 'inserisci il un nuovo tag');
        if (response == null) {
            UIkit.notification({
                message: 'operazione annullata',
                pos: 'bottom-right'
            }, {
                status: 'success'
            })
        } else if (response != 'inserisci il un nuovo tag' && response != '' && email != '') {
            var docRef = db.collection("tag").doc(email);

            docRef.get().then(function (doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data().name);
                    db.collection("tag").doc(email).set({
                            name: doc.data().name + response + "§"
                        })
                        .then(function () {
                            console.log("Document successfully written!");
                            UIkit.notification({
                                message: 'tag Aggiunto con successo!',
                                pos: 'bottom-right'
                            })
                            insertTag(response);

                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                            UIkit.notification({
                                message: 'errore:' + error,
                                pos: 'bottom-right'
                            })
                        });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    db.collection("tag").doc(email).set({
                            name: response + "§",
                        })
                        .then(function () {
                            console.log("Document successfully written!");
                            UIkit.notification({
                                message: 'tag Aggiunto con successo!',
                                pos: 'bottom-right'
                            })
                            insertTag(response);

                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                            UIkit.notification({
                                message: 'errore:' + error,
                                pos: 'bottom-right'
                            })
                        });
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
                UIkit.notification({
                    message: 'errore: ' + error,
                    pos: 'bottom-right'
                })
            });


        } else {
            UIkit.notification({
                message: 'inserire nome tag valido',
                pos: 'bottom-right'
            }, {
                status: 'danger'
            })
        }

    });
});


function insertTag(element) {
    const listTag = document.getElementById("list-tag-load-db");
    var nodeElement = document.createElement("li");
    nodeElement.setAttribute("id", element.trim());
    nodeElement.setAttribute("class", "hasPointer");
    var nodeText = document.createTextNode(element);
    nodeElement.appendChild(nodeText);
    listTag.appendChild(nodeElement);
    var hrElement = document.createElement("hr");
    hrElement.setAttribute("id", element);
    listTag.appendChild(hrElement);
    var listener = document.getElementById(element.trim()).addEventListener("click", function () {
        console.log("hai cliccato: " + element + " pronto per interagire con db");
        var container = document.getElementById("flex-tags");
        var btnTag = document.createElement("a");
        btnTag.setAttribute("class", "tag");
        var btnAdd = document.createElement("i");
        btnAdd.setAttribute("class", "far fa-times-circle hasPointer");
        var btnTagText = document.createTextNode(element + " ");
        btnTag.appendChild(btnTagText);
        btnTag.appendChild(btnAdd);
        btnTag.addEventListener("click", function () {
            console.log("hai cliccato i tag arancioni");
            showTagList(element);
            btnTag.remove();

        });
        container.appendChild(btnTag);
        //  listTag.removeChild(nodeElement);
        //  listTag.removeChild(hrElement);
        nodeElement.style.display = 'none';
        hrElement.style.display = 'none';
    });
}



var btnConfirmList = document.getElementById("confirm-list-add");
btnConfirmList.addEventListener("click", function addEditLists() {
    console.log("hai confermato la lista: pronto per aggiungerla!");
    const titleList = document.getElementById("titolo-spesa").value;
    if (titleList == "") {
        UIkit.notification("inserire il titolo della lista!", {
            pos: 'bottom-right'
        })
    } else {
        const descList = document.getElementById("note-spesa").value;
        // console.log(titleList+" "+descList);
        var chosenTags = '';
        document.querySelectorAll("a[class=tag]").forEach(element => {
            // console.log(element.text);
            chosenTags += element.text.trim() + "§";
        });
        console.log(chosenTags);

        db.collection("elenco-liste").doc().set({
                titolo: titleList,
                descrizione: descList,
                tags: chosenTags,
                user: email,

            })
            .then(function () {
                console.log("Document successfully written!");
                UIkit.notification("lista aggiunta con successo!", {
                    pos: 'bottom-right'
                });
                //createList(titleList, descList, tags, 1);

                document.getElementById("titolo-spesa").value = "";
                document.getElementById("note-spesa").value = "";
                document.querySelectorAll("a[class=tag]").forEach(element => {
                    console.log(element.text);
                    document.querySelectorAll(".tag").forEach(item => {
                        item.click();
                    })
                    element.remove();
                });
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
                UIkit.notification("errore: " + error, {
                    pos: 'bottom-right'
                });
            });
    }



});



//func per creare le liste
function createList(titolo, descrizione, tags, isEven) {
    console.log("is even :" + isEven);
    //hide spinner

    const container = document.getElementById("listParent");

    var margindiv = document.createElement("div");
    var MainDiv = document.createElement("div");
    if (isEven % 2 == 0) {
        MainDiv.setAttribute("class", "uk-card uk-card-primary  uk-card-body uk-inline-clip uk-transition-toggle");
    } else {
        MainDiv.setAttribute("class", "uk-card uk-card-default  uk-card-body uk-inline-clip uk-transition-toggle");
    }

    var titleList = document.createElement("h3");
    titleList.setAttribute("class", "uk-card-title");
    var titleListText = document.createTextNode(titolo);
    titleList.appendChild(titleListText);
    var descList = document.createElement("p");
    if (descrizione != "") {
        var descListText = document.createTextNode(descrizione);
    } else {
        var descListText = document.createTextNode("nessuna nota ");
    }

    descList.appendChild(descListText);

    //delete, navigate and edit section
    var divBanner = document.createElement("div");
    divBanner.setAttribute("class", "uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-default");
    var flexDivItems = document.createElement("div");
    flexDivItems.setAttribute("class", "flexy-box");
    var pEdit = document.createElement("p");
    pEdit.setAttribute("class", "uk-h4 uk-margin-remove");
    var iconEdit = document.createElement("i");
    iconEdit.setAttribute("class", "fas fa-pen");
    pEdit.appendChild(iconEdit);
    var pNavigate = document.createElement("p");
    pNavigate.setAttribute("class", "uk-h4 uk-margin-remove");
    var iconNavigate = document.createElement("i");
    iconNavigate.setAttribute("class", "fas fa-paper-plane");
    pNavigate.appendChild(iconNavigate);
    var pDelete = document.createElement("p");
    pDelete.setAttribute("class", "uk-h4 uk-margin-remove");
    var iconDelete = document.createElement("i");
    iconDelete.setAttribute("class", "fas fa-trash");
    pDelete.appendChild(iconDelete);
    flexDivItems.appendChild(pEdit);
    flexDivItems.appendChild(pNavigate);
    flexDivItems.appendChild(pDelete);
    divBanner.appendChild(flexDivItems);
    MainDiv.appendChild(titleList);
    MainDiv.appendChild(descList);
    MainDiv.appendChild(divBanner);
    margindiv.appendChild(MainDiv)
    container.appendChild(margindiv);
    pEdit.addEventListener("click", function () {
        //preparo modal prima di aprirla
        console.log("hai cliccato l'icona per modificare!");
        console.log(tags);
        document.getElementById("confirm-list-add").style.display = "none";


        document.querySelectorAll("h2.uk-modal-title")[0].innerHTML = "Modifica la lista";
        document.getElementById("addList").click();
        document.querySelectorAll("#confirm-list-add").forEach(node => {
            node.style.display = "none";
        });
        console.log("ho tolto tutti i conferma");
        const container = document.getElementById("flex-tags");
        var DivSpinner = document.createElement("div");
        document.getElementById("titolo-spesa").value = titolo;
        document.getElementById("note-spesa").value = descrizione;

        DivSpinner.setAttribute("uk-spinner", "");

        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
        container.appendChild(DivSpinner);
        setTimeout(() => {
            container.removeChild(container.lastChild);
            var tokenTags = tags.split("§");

            tokenTags.forEach(node => {
                if (node != "") {
                    console.log("cerco node di " + node);
                    console.log("li[id='" + node + "'" + "]");
                    document.querySelector("li[id='" + node + "'" + "]").click();

                };

            });
        }, 1000);


        var btnEditList = document.createElement("button");
        btnEditList.setAttribute("class", "uk-button uk-button-primary");
        btnEditList.setAttribute("id", "confirm-list-edit");
        var btnEditListText = document.createTextNode("Modifica");
        btnEditList.appendChild(btnEditListText);
        document.querySelectorAll(".uk-modal-footer")[0].appendChild(btnEditList);
        btnEditList.addEventListener("click", function editList() {
            const titoloInput = document.getElementById("titolo-spesa").value;
            const noteInput = document.getElementById("note-spesa").value;
            console.log("finalmente pronto per modificare la lista");



            db.collection("elenco-liste").where("titolo", "==", titolo).where("descrizione", "==", descrizione).where("user", "==", email)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        const idDocPreUpdate = doc.id;
                        var elencoListeRef = db.collection("elenco-liste").doc(idDocPreUpdate);
                        var chosenTags = '';
                        document.querySelectorAll("a[class=tag]").forEach(element => {
                            // console.log(element.text);
                            chosenTags += element.text.trim() + "§";
                        });
                        console.log(chosenTags);
                        console.log(titoloInput + "   " + noteInput);
                        return elencoListeRef.update({
                                titolo: titoloInput,
                                descrizione: noteInput,
                                tags: chosenTags
                            })
                            .then(function () {
                                console.log("Document successfully updated!");
                                document.querySelector(".uk-close").click();
                                UIkit.notification("lista modificata con successo!", {
                                    pos: 'bottom-right'
                                })
                                restoreModalButtons();
                                document.getElementById("confirm-list-add").style.display = "";
                                document.querySelectorAll("h2.uk-modal-title")[0].innerHTML = "Aggiungi lista";
                            })
                            .catch(function (error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                                UIkit.notification("errore durante la modifica della lista", {
                                    pos: 'bottom-right'
                                })
                            });
                    });
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });


            // document.querySelectorAll(".uk-modal-footer")[0].removeChild(btnEditList);


        })


    });

    pNavigate.addEventListener("click", () => {
        console.log("ready to navigate!");
        initForNavigateEvent(titolo, descrizione);
    });
    pDelete.addEventListener("click", function () {
        // per eliminare la lista prima richiedo lettura dal db per per ricavare l'id della raccolta per poi eliminarlo con quel id
        UIkit.modal.confirm('eliminare la lista? ').then(function () {
            console.log('Confirmed.');
            db.collection("elenco-liste").where("titolo", "==", titolo)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        db.collection("elenco-liste").doc(doc.id).delete().then(function () {
                            console.log("Document successfully deleted!");
                            UIkit.notification("lista eliminata con successo!", {
                                pos: 'bottom-right'
                            })
                        }).catch(function (error) {
                            console.error("Error removing document: ", error);
                            UIkit.notification("errore: " + error, {
                                pos: 'bottom-right'
                            })
                        });
                    });
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                    UIkit.notification("errore durante l'eliminazione", {
                        pos: 'bottom-right'
                    })
                });
        }, function () {
            console.log('Rejected.');
        });





    })
}


function restoreModalButtons() {
    var parent = document.querySelector(".uk-modal-footer");
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
    }
    var annullaBtn = document.createElement("button");
    annullaBtn.setAttribute("class", "uk-button uk-button-default uk-modal-close");
    var confirmBtn = document.createElement("button");
    var confirmBtnText = document.createTextNode("Conferma");
    confirmBtn.appendChild(confirmBtnText);
    var annullaBtnText = document.createTextNode("Annulla");
    annullaBtn.appendChild(annullaBtnText);
    confirmBtn.setAttribute("class", "uk-button uk-button-primary");
    confirmBtn.setAttribute("id", "confirm-list-add");
    parent.appendChild(annullaBtn);
    parent.appendChild(confirmBtn);
    console.log("restored");
    document.getElementById("titolo-spesa").value = "";
    document.getElementById("note-spesa").value = "";
    document.querySelectorAll("a[class='tag']").forEach(element => {
        element.click();
    });

    //rimetto il confirm listener in quanto lo ha perso 

    var btnConfirmList = document.getElementById("confirm-list-add");
    btnConfirmList.addEventListener("click", function addEditLists() {
        console.log("hai confermato la lista: pronto per aggiungerla!");
        const titleList = document.getElementById("titolo-spesa").value;
        if (titleList == "") {
            UIkit.notification("inserire il titolo della lista!", {
                pos: 'bottom-right'
            })
        } else {
            const descList = document.getElementById("note-spesa").value;
            // console.log(titleList+" "+descList);
            var chosenTags = '';
            document.querySelectorAll("a[class=tag]").forEach(element => {
                // console.log(element.text);
                chosenTags += element.text.trim() + "§";
            });
            console.log(chosenTags);

            db.collection("elenco-liste").doc().set({
                    titolo: titleList,
                    descrizione: descList,
                    tags: chosenTags,
                    user: email,

                })
                .then(function () {
                    console.log("Document successfully written!");
                    UIkit.notification("lista aggiunta con successo!", {
                        pos: 'bottom-right'
                    });

                    document.getElementById("titolo-spesa").value = "";
                    document.getElementById("note-spesa").value = "";
                    document.querySelectorAll("a[class=tag]").forEach(element => {
                        console.log(element.text);
                        document.querySelectorAll(".tag").forEach(item => {
                            item.click();
                        })
                        element.remove();
                    });
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                    UIkit.notification("errore: " + error, {
                        pos: 'bottom-right'
                    });
                });
        }



    });

}


function initForNavigateEvent(titolo, note) {
    $("footer").hide();
    $("#listContainer").hide();
    $("#addList").hide();



    /**
     * da appendere al parent con id navigator
     *     <div class="uk-container uk-align-center">
        <div class="uk-panel uk-panel-scrollable not-resizable fullheight">
            <table class="uk-table uk-table-divider ">
                <thead>
                    <tr>
                        <th>Table Heading</th>
                        <th>Table Heading</th>
                        <th>Table Heading</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Table Data</td>
                        <td>Table Data</td>
                        <td>Table Data</td>
                    </tr>
                    <tr>
                        <td>Table Data</td>
                        <td>Table Data</td>
                        <td>Table Data</td>
                    </tr>
                    <tr>
                        <td>Table Data</td>
                        <td>Table Data</td>
                        <td>Table Data</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
     */
    const parentNode = document.getElementById("navigator");
    parentNode.innerHTML = "<span id='spinner' class='uk-margin-small-right spinner' uk-spinner='ratio: 3'></span>";

    var divContainer = document.createElement("div");
    divContainer.setAttribute("class", "uk-container uk-align-center");
    var divScroll = document.createElement("div");
    divScroll.setAttribute("class", "uk-panel uk-panel-scrollable not-resizable fullheight");
    var tableNavigator = document.createElement("table");
    tableNavigator.setAttribute("class", "uk-table uk-table-hover uk-table-divider");
    var tbodyNavigator = document.createElement("tbody");
    tbodyNavigator.setAttribute("id", "tableNavigator");
    tableNavigator.appendChild(tbodyNavigator);
    divScroll.appendChild(tableNavigator);
    divContainer.appendChild(divScroll);
    parentNode.appendChild(divContainer);

    console.log("adesso tocca al db");
    console.log(email + titolo + note);

    db.collection("elenco-liste").where("titolo", "==", titolo).where("descrizione", "==", note).where("user", "==", email)
        .get()
        .then(function (querySnapshot) {

            querySnapshot.forEach(function (doc) {


                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());

                db.collection("articoli-spesa").where("spesa_riferimento", "==", doc.id)
                    .onSnapshot(function (querySnapshot) {
                        //parentNode.removeChild(parentNode.childNodes[0]);//rimuove lo spinner
                        document.querySelector("#navigator").querySelector("#spinner").setAttribute("class", "hide");
                        while (tbodyNavigator.hasChildNodes()) {
                            tbodyNavigator.removeChild(tbodyNavigator.lastChild);
                        }


                        /**
                         * <a href="#modal-example" uk-toggle>Open</a>

                            <!-- This is the modal -->
                            <div id="modal-example" uk-modal>
                                <div class="uk-modal-dialog uk-modal-body">
                                    <h2 class="uk-modal-title">Headline</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <p class="uk-text-right">
                                        <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                                        <button class="uk-button uk-button-primary" type="button">Save</button>
                                    </p>
                                </div>
                            </div>
                         */


                        var anchorAddArticolo = document.createElement("a");
                        anchorAddArticolo.setAttribute("class", "float");
                        anchorAddArticolo.setAttribute("href", "#modal-navigator");
                        anchorAddArticolo.setAttribute("uk-toggle", "");
                        var iconAddArticolo = document.createElement("i");
                        iconAddArticolo.setAttribute("class", "fa fa-plus my-float");
                        anchorAddArticolo.appendChild(iconAddArticolo);
                        parentNode.appendChild(anchorAddArticolo);
                        $('#navigator').append('<div id="modal-navigator" uk-modal> <div class="uk-modal-dialog uk-modal-body"> <h2 class="uk-modal-title">Aggiungi un nuovo articolo</h2> <div class="uk-margin"> <label class="uk-form-label" for="form-stacked-text">Nome Articolo</label> <div class="uk-form-controls"> <input class="uk-input" id="nomeNavigator" type="text" placeholder="inserisci nome articolo"> </div> </div>  <div class="uk-margin"> <label class="uk-form-label" for="form-stacked-text">dose</label> <div class="uk-form-controls"> <input class="uk-input" id="doseNavigator" type="number" placeholder="inserisci dose"> </div> </div>  <div class="uk-margin"> <label class="uk-form-label" for="form-stacked-select">Unità di misura</label> <div class="uk-form-controls"> <select class="uk-select" id="selectNavigator"> <option value="kg">kg</option> <option value="gr">gr</option> <option value="ml">ml</option> <option value="l">l</option> </select> </div> </div>  <div class="uk-margin"> <label class="uk-form-label" for="form-stacked-text">quantità</label> <div class="uk-form-controls"> <input class="uk-input" id="quantitaNavigator" type="number" placeholder="inserisci quantità"> </div> </div><p class="uk-text-right"> <button id="cancelNavigator" class="uk-button uk-button-default uk-modal-close" type="button">Annulla</button> <button id="confirmNavigator" class="uk-button uk-button-primary" type="button">Aggiungi</button> </p> </div> </div>');
                        /*  anchorAddArticolo.addEventListener("click", () => {
                              console.log("pronto per aggiungere articoli!");
                          })*/
                        var cancelArticoloNavigator = document.getElementById("cancelNavigator");
                        cancelArticoloNavigator.addEventListener("click", () => {
                            console.log("pronto per annullare");
                            document.getElementById("nomeNavigator").value = "";
                            document.getElementById("doseNavigator").value = "";
                            document.getElementById("selectNavigator").value = "kg";
                            document.getElementById("quantitaNavigator").value = "";
                        });
                        var addArticoloNavigator = document.getElementById("confirmNavigator");
                        addArticoloNavigator.addEventListener("click", () => {
                            // var nomeArtVal = document.getElementById("nomeNavigator").value;
                            //   var dose = document.getElementById("doseNavigator").value;
                            //  var unita = document.getElementById("selectNavigator").value;
                            //  var quantity = document.getElementById("quantitaNavigator").value;
                            // console.log("pronto per mandare al db: " + nomeArtVal + " " + dose + " " + unita + " " + quantity);
                            // console.log(doc.id);
                            var indexNome = document.querySelectorAll("#nomeNavigator").length - 1;
                            var indexdose = document.querySelectorAll("#doseNavigator").length - 1;
                            var indexunita = document.querySelectorAll("#selectNavigator").length - 1;
                            var indexquantita = document.querySelectorAll("#quantitaNavigator").length - 1;
                            if (Boolean(document.querySelectorAll("#nomeNavigator")[indexNome].value) && !isNaN(document.querySelectorAll("#doseNavigator")[indexdose].value) && !isNaN(document.querySelectorAll("#quantitaNavigator")[indexquantita].value)) {
                                db.collection("articoli-spesa").doc().set({
                                        dose: document.querySelectorAll("#doseNavigator")[indexdose].value,
                                        nome: document.querySelectorAll("#nomeNavigator")[indexNome].value,
                                        quantita: document.querySelectorAll("#quantitaNavigator")[indexquantita].value,
                                        spesa_riferimento: doc.id,
                                        unita_misura: document.querySelectorAll("#selectNavigator")[indexunita].value
                                    })
                                    .then(function () {
                                        console.log("Document successfully written!");
                                        UIkit.notification("articolo aggiunto con successo!", {
                                            pos: 'bottom-right'
                                        });
                                        cancelArticoloNavigator.click();
                                    })
                                    .catch(function (error) {
                                        console.error("Error writing document: ", error);
                                        UIkit.notification("errore durante l'aggiunta dell'articolo", {
                                            pos: 'bottom-right'
                                        })
                                    });
                            } else {
                                UIkit.notification("form non corretta", {
                                    pos: 'bottom-right'
                                });
                            }


                        });
                        let counterElement = 0;
                        if (querySnapshot.size == 0) {
                            console.log("lista vuota");
                            //qui codice per far vedere qualcosa (aggiungi articoli!)
                            $("#is-the-list-empty").html('<ul class="breadcrumb"> <li><a href="user.html">Home</a></li> <li>' + querySnapshot.size + " articoli" + '</li> <li>' + titolo + '</li> </ul>');
                        } else {
                            $("#is-the-list-empty").html('<ul class="breadcrumb"> <li><a href="user.html">Home</a></li> <li>' + querySnapshot.size + " articoli" + '</li> <li>' + titolo + '</li> </ul>');
                        }
                        querySnapshot.forEach(function (doc) {
                            //counterElement serve per il primo td visto che non si vede bene il dropdown
                            counterElement++;
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id, " => ", doc.data());
                            var trNavigator = document.createElement("tr");
                            var tdArticolo = document.createElement("td");
                            var tdArticoloText = document.createTextNode(doc.data().nome);
                            tdArticolo.appendChild(tdArticoloText);
                            var tdDose = document.createElement("td");
                            var tdDoseText = document.createTextNode(doc.data().dose + doc.data().unita_misura);
                            tdDose.appendChild(tdDoseText);
                            var tdQuantita = document.createElement("td");
                            var tdQuantitaText = document.createTextNode(doc.data().quantita);
                            tdQuantita.appendChild(tdQuantitaText);
                            var options = document.createElement("td");
                            var iconDots = document.createElement("i");
                            iconDots.setAttribute("class", "fas fa-ellipsis-v");
                            var buttonOption = document.createElement("button");
                            buttonOption.appendChild(iconDots);
                            options.appendChild(buttonOption);
                            var divDropdown = document.createElement("div");
                            divDropdown.setAttribute("uk-dropdown", "pos: right-center");
                            var ulDrop = document.createElement("ul");
                            ulDrop.setAttribute("class", "uk-nav uk-dropdown-nav");
                            var liEditTitolo = document.createElement("li");
                            var anchorDropEditTitolo = document.createElement("a");
                            anchorDropEditTitolo.appendChild(document.createTextNode("Modifica nome articolo"));
                            liEditTitolo.appendChild(anchorDropEditTitolo);
                            var liEditDose = document.createElement("li");
                            var anchorDropEditDose = document.createElement("a");
                            anchorDropEditDose.appendChild(document.createTextNode("Modifica dose"));
                            liEditDose.appendChild(anchorDropEditDose);
                            var liEditMisura = document.createElement("li");
                            var anchorDropEditMisura = document.createElement("a");
                            anchorDropEditMisura.appendChild(document.createTextNode("Modifica unità di misura"));
                            liEditMisura.appendChild(anchorDropEditMisura);
                            var liEditquantita = document.createElement("li");
                            var anchorDropEditquantita = document.createElement("a");
                            anchorDropEditquantita.appendChild(document.createTextNode("Modifica quantità"));
                            liEditquantita.appendChild(anchorDropEditquantita);
                            var liDelete = document.createElement("li");
                            var anchorDropDelete = document.createElement("a");
                            anchorDropDelete.appendChild(document.createTextNode("Elimina"));
                            liDelete.appendChild(anchorDropDelete);
                            console.log(counterElement);
                            if (counterElement == 1) {
                                ulDrop.appendChild(document.createElement("br"));
                                ulDrop.appendChild(document.createElement("br"));
                                ulDrop.appendChild(document.createElement("br"));
                            }

                            ulDrop.appendChild(liEditTitolo);
                            ulDrop.appendChild(liEditDose);
                            ulDrop.appendChild(liEditMisura);
                            ulDrop.appendChild(liEditquantita);
                            ulDrop.appendChild(liDelete);
                            divDropdown.appendChild(ulDrop);
                            //options.appendChild(iconDots);
                            trNavigator.appendChild(tdArticolo);
                            trNavigator.appendChild(tdDose);
                            trNavigator.appendChild(tdQuantita);
                            trNavigator.appendChild(options);
                            trNavigator.appendChild(divDropdown);
                            tbodyNavigator.appendChild(trNavigator);
                            liEditTitolo.addEventListener("click", () => {
                                console.log(doc.data().nome);
                                var nuovoTitolo = UIkit.modal.prompt('nuovo nome articolo:', '')
                                    .then(function (response) {
                                        console.log("response");
                                        if (response == null) {
                                            UIkit.notification({
                                                message: 'operazione annullata',
                                                pos: 'bottom-right'
                                            })
                                        } else if (response != "") {

                                            db.collection("articoli-spesa").doc(doc.id).update({
                                                    "nome": response,
                                                })
                                                .then(function () {
                                                    console.log("Document successfully updated!");
                                                    UIkit.notification({
                                                        message: 'nome modificato con successo!',
                                                        pos: 'bottom-right'
                                                    })
                                                });
                                        } else {
                                            UIkit.notification({
                                                message: 'inserire nome  valido',
                                                pos: 'bottom-right'
                                            }, {
                                                status: 'danger'
                                            })
                                        }


                                    })

                            });
                            liEditDose.addEventListener("click", () => {
                                console.log(doc.data().dose);
                                var nuovaDose = UIkit.modal.prompt('nuova dose articolo:', '')
                                    .then(function (response) {
                                        console.log("response");
                                        console.log(isNaN(response));
                                        if (response == null) {
                                            UIkit.notification({
                                                message: 'operazione annullata',
                                                pos: 'bottom-right'
                                            })
                                        } else if (response != "" && !isNaN(response)) {

                                            db.collection("articoli-spesa").doc(doc.id).update({
                                                    "dose": response,
                                                })
                                                .then(function () {
                                                    console.log("Document successfully updated!");
                                                    UIkit.notification({
                                                        message: 'dose modificata con successo!',
                                                        pos: 'bottom-right'
                                                    })
                                                });
                                        } else {
                                            UIkit.notification({
                                                message: 'inserire dose valida',
                                                pos: 'bottom-right'
                                            }, {
                                                status: 'danger'
                                            })
                                        }


                                    })
                            });
                            liEditMisura.addEventListener("click", () => {
                                console.log(doc.data().unita_misura);

                                var nuovoMisura = UIkit.modal.prompt('nuova unità di misura articolo:', '')
                                    .then(function (response) {
                                        console.log("response");
                                        if (response == null) {
                                            UIkit.notification({
                                                message: 'operazione annullata',
                                                pos: 'bottom-right'
                                            })
                                        } else if (response != "" && (response == "gr" || response == "kg" || response == "ml" || response == "l")) {

                                            db.collection("articoli-spesa").doc(doc.id).update({
                                                    "unita_misura": response,
                                                })
                                                .then(function () {
                                                    console.log("Document successfully updated!");
                                                    UIkit.notification({
                                                        message: 'unità di misura modificatoa con successo!',
                                                        pos: 'bottom-right'
                                                    })
                                                });
                                        } else {
                                            UIkit.notification({
                                                message: 'inserire unità di misura valida (gr, kg,ml,l)',
                                                pos: 'bottom-right'
                                            }, {
                                                status: 'danger'
                                            })
                                        }


                                    })
                            });
                            liEditquantita.addEventListener("click", () => {
                                console.log(doc.data().quantita);
                                var nuovaDose = UIkit.modal.prompt('nuova quantità articolo:', '')
                                    .then(function (response) {
                                        console.log("response");
                                        console.log(isNaN(response));
                                        if (response == null) {
                                            UIkit.notification({
                                                message: 'operazione annullata',
                                                pos: 'bottom-right'
                                            })
                                        } else if (response != "" && !isNaN(response)) {

                                            db.collection("articoli-spesa").doc(doc.id).update({
                                                    "quantita": response,
                                                })
                                                .then(function () {
                                                    console.log("Document successfully updated!");
                                                    UIkit.notification({
                                                        message: 'quantità modificata con successo!',
                                                        pos: 'bottom-right'
                                                    })
                                                });
                                        } else {
                                            UIkit.notification({
                                                message: 'inserire quantita valida',
                                                pos: 'bottom-right'
                                            }, {
                                                status: 'danger'
                                            })
                                        }


                                    })
                            });
                            liDelete.addEventListener("click", () => {
                                UIkit.modal.confirm("Eliminare definitivamente l'articolo?").then(function () {
                                    console.log('Confirmed.')
                                    db.collection("articoli-spesa").doc(doc.id).delete().then(function () {
                                        console.log("Document successfully deleted!");
                                        UIkit.notification("articolo eliminato", {
                                            pos: 'bottom-right'
                                        })
                                    }).catch(function (error) {
                                        console.error("Error removing document: ", error);
                                        UIkit.notification("errore durante l'eliminazione", {
                                            pos: 'bottom-right'
                                        })
                                    });
                                }, function () {
                                    console.log('Rejected.')

                                });
                            });
                            /**
                    <i class="fas fa-ellipsis-v"></i>
                        <button ><i class="fas fa-ellipsis-v"></i></button>
                    <div uk-dropdown>
                        <ul class="uk-nav uk-dropdown-nav">
                            <li class="uk-active"><a href="#">Active</a></li>
                            <li><a href="#">Item</a></li>
                            <li class="uk-nav-header">Header</li>
                            <li><a href="#">Item</a></li>
                            <li><a href="#">Item</a></li>
                            <li class="uk-nav-divider"></li>
                            <li><a href="#">Item</a></li>
                        </ul>
                    </div>
                          */




                        });
                    })


            });
        })
    //    document.getElementById("navigator").innerHTML='<a href="#" class="float"> <i class="fa fa-plus my-float"></i> </a>';

}
}

var btnLogin = document.getElementById("login");





//login
btnLogin.addEventListener("click", function () {

    var inputEmail = document.getElementById("emailLogin");
    var inputPsw = document.getElementById("passwordLogin");
    const emailTxt = inputEmail.value;
    const pswTxt = inputPsw.value;
    console.log("email: " + emailTxt + " pass: " + pswTxt);
    $("#emailLogin").removeClass("uk-form-success"),
        $("#emailLogin").removeClass("uk-form-danger"),
        $("#passwordLogin").removeClass("uk-form-success"),
        $("#passwordLogin").removeClass("uk-form-danger");
    //registrazione
    if (emailTxt == '' && pswTxt == '') {

        $('#emailLogin').attr("placeholder", ' inserisci l\'email.');
        $("#emailLogin").removeClass("uk-form-success"),
            $("#emailLogin").addClass("uk-form-danger");
        $('#passwordLogin').attr("placeholder", ' inserisci la password.');
        $("#passwordLogin").removeClass("uk-form-success"),
            $("#passwordLogin").addClass("uk-form-danger");
    } else if (emailTxt == '') {
        $('#emailLogin').attr("placeholder", ' inserisci l\'email.');
        $("#emailLogin").removeClass("uk-form-success"),
            $("#emailLogin").addClass("uk-form-danger");
    } else if (pswTxt == '') {
        $('#passwordLogin').attr("placeholder", ' inserisci la password.');
        $("#passwordLogin").removeClass("uk-form-success"),
            $("#passwordLogin").addClass("uk-form-danger");

    } else {
        firebase.auth().signInWithEmailAndPassword(emailTxt, pswTxt).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorMessage == 'The email address is badly formatted.') {
                UIkit.notification("L\'indirizzo email è formattato in modo errato.", {
                    pos: 'bottom-right'
                }, {
                    status: 'danger'
                });
                $("#emailLogin").focus(),
                    $("#emailLogin").attr("placeholder", ' L\'indirizzo email è formattato in modo errato.'),
                    $("#emailLogin").removeClass("uk-form-success"),
                    $("#emailLogin").addClass("uk-form-danger");
            } else if (errorMessage == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
                UIkit.notification("impossibile trovare il tuo account faiSpesa😯", {
                    pos: 'bottom-right'
                }, {
                    status: 'danger'
                });
                $("#emailLogin").removeClass("uk-form-success"),
                    $("#emailLogin").addClass("uk-form-danger");
            } else if (errorMessage == 'The password is invalid or the user does not have a password.') {
                $("#passwordLogin").focus(),
                    UIkit.notification("password non valida", {
                        pos: 'bottom-right'
                    }, {
                        status: 'danger'
                    });
                $("#passwordLogin").removeClass("uk-form-success"),
                    $("#passwordLogin").addClass("uk-form-danger");
                $("#passwordLogin").val("");
            }
        });
    }



});

var btnLogOut = document.getElementById("logout");
btnLogOut.addEventListener('click', e => {
    firebase.auth().signOut();
    console.log('logged out');
    window.location.href = ('index.html');
});
var email = "";
var name = "";
//realtime auth listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        // console.log(firebaseUser);
        btnLogOut.classList.remove('hide');
        firebaseUser.providerData.forEach(function (profile) {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            name = profile.displayName;
            console.log("  Email: " + profile.email);
            email = profile.email;
            console.log("  Email: " + profile.emailVerified);
            console.log("  Password: " + profile.password);
            // window.location.href = ('user.html');

            var location = window.location.pathname.split('/');
           // var counter = location.length - 1;
            console.log(location);
          //  console.log(location[counter]);
            if (location[2] == 'index.html' || location[2] == '') {
                console.log("sto reindirizzando in user.html");
                window.location.href = "https://majkl-zumberi.github.io/faispesa/user.html";
            } else if (location[2] == 'user.html') {
                var userEmail = document.getElementById('user-email').innerHTML = profile.email;
                var username = document.getElementById("user-name").innerHTML = profile.displayName;
            
            //number per scegliere il colore liste in base se questo numero è pari o dispari
            var number = 1;
            //creazione list .orderBy("titolo", "asc")
            db.collection("elenco-liste").orderBy("titolo", "asc").where("user", "==", email)
                .onSnapshot(function (querySnapshot) {
                    if (querySnapshot.size != 0) {
                        document.getElementById("listContainer").removeAttribute("class");
                        document.getElementById("listContainer").setAttribute("class", "uk-panel uk-panel-scrollable not-resizable fullheight");
                        document.querySelector("#bringToFront").children[0].setAttribute("class", "hide");
                        document.querySelector("#bringToFront").children[1].setAttribute("class", "hide");
                        document.querySelector("#bringToFront").children[3].setAttribute("class", "hide");
                        //   document.querySelector("#bringToFront").children[3].setAttribute("class","overwrite-position");
                        document.querySelector("#bringToFront").children[2].children[0].setAttribute("class", "hide");
                        document.querySelector("#bringToFront").children[2].children[1].setAttribute("class", "hide");
                        var littleBanner = document.getElementById("is-the-list-empty").innerHTML = "  Elenco liste della spesa(" + querySnapshot.size + ")";
                        const container = document.getElementById("listParent");
                        while (container.hasChildNodes()) {
                            container.removeChild(container.lastChild);
                        }
                        querySnapshot.forEach(function (doc) {
                            // doc.data() is never undefined for query doc snapshots
                            document.getElementById("spinner").setAttribute("class", "hide");
                            console.log(doc.id, " => ", doc.data());
                            createList(doc.data().titolo, doc.data().descrizione, doc.data().tags, number);
                            number++;
                        });
                        document.getElementById("bottonePiu").style.position = "absolute";
                        document.getElementById("bottonePiu").style.bottom = "16vh";
                        document.getElementById("bottonePiu").style.right = "0";
                        document.getElementById("bottonePiu").style.zIndex = "1";
                    } else {
                     //   var littleBanner = document.getElementById("is-the-list-empty").innerHTML = "Nessuna lista presente";
                        document.getElementById("listContainer").setAttribute("class", "hide");
                        document.querySelector("#bringToFront").children[0].removeAttribute("class");
                        document.querySelector("#bringToFront").children[1].removeAttribute("class");
                        document.querySelector("#bringToFront").children[3].removeAttribute("class");
                        document.querySelector("#bringToFront").children[3].setAttribute("class", "overwrite-position");
                        document.querySelector("#bringToFront").children[2].children[0].removeAttribute("class");
                        document.querySelector("#bringToFront").children[2].children[1].removeAttribute("class");
                        document.getElementById("bottonePiu").style.position = "";
                        document.getElementById("bottonePiu").style.bottom = "";
                        document.getElementById("bottonePiu").style.right = "";
                        document.getElementById("bottonePiu").style.zIndex = "";
                    }

                })

            }

        });
    } else {
        console.log('not logged in');
        btnLogOut.classList.add('hide');

    }
});
