const bodyElement = document.body;
const modalTitleWords = "Increase Security for Your Shipment";
const modalParagraphWords = "To ensure your order arrives safely to your door, we strongly recommend signing up for the FREE FedEx Delivery Manager®. This will allow you to:"

const ulItems = [
"Track Packages and Get Alerts on the status of your shipment",
"Added security with the option to pick-up your package from thousands of convenient locations",
"Increased convenience by allowing you to schedule specific delivery windows or deliver to a different address*"];

const modalFinePrintWords = "*Scheduling a delivery window, requesting delivery to another address or Deliver Another Day are subject to additional FedEx Fees";
const modalAcceptWords = "Sign Me Up!";
const modalDeclineWords = "Decline Additional Security";
const goToFedExLink = "https://www.fedex.com/en-us/delivery-manager.html";

const confirmTitleWords = "Are you sure?";
const confirmParagraphWords = "FedEx Delivery Manager® is a Free Service. If your package shows as Delivered by FedEx but you can't locate it, neither ERIK'S nor FedEx can be held responsible.";
const confirmDeclineButtonWords = "I Still Want To Decline";
const confirmAcceptButtonWords = "OK, Sign Me Up";

const devEnv = localStorage.getItem("localDevEnv") === "true" ? true : false;
const modalTimer = devEnv ? 5000 : 1800000;

const showFedExModal = () => {

    const closeModal = () => {
        modalBackground.remove();
    }

    const userAcceptFedEx = () => {
        logUserTime();
        window.open(goToFedExLink, "_blank");
        closeModal();
    }

    const userFirstDeclineFedEx = () => {
        showConfirmModal();
    }

    const userSecondDeclineFedEx = () => {
        logUserTime();
        closeModal();
    }

    const showConfirmModal = () => {
        modalUL.remove();
        modalFinePrint.remove();
        modalTitle.innerText = confirmTitleWords;
        modalParagraph.innerText = confirmParagraphWords;
        acceptFedExButton.innerText = confirmAcceptButtonWords;
        declineFedExButton.innerText = confirmDeclineButtonWords;
        declineFedExButton.onclick = userSecondDeclineFedEx;
    }

    const logUserTime = () => {
        localStorage.setItem("userModalTime", Date.now());
    }

    // Create Background --
    const modalBackground = document.createElement("div");
    modalBackground.className = "modal-background";
    bodyElement.appendChild(modalBackground);

    // Create Modal Box --
    const modalBox = document.createElement("div");
    modalBox.className = "modal-box";
    modalBackground.appendChild(modalBox);

    // Create Modal Container --
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";
    modalBox.appendChild(modalContainer);

    // Create Headline --
    const modalTitle = document.createElement("h2");
    modalTitle.className = "modal-title";
    modalTitle.innerText = modalTitleWords;
    modalContainer.appendChild(modalTitle);

    // Create Paragraph Text --
    const modalParagraph = document.createElement("p");
    modalParagraph.className = "modal-text";
    modalParagraph.innerText = modalParagraphWords;
    modalContainer.appendChild(modalParagraph);

    // Create Unordered List --
    const modalUL = document.createElement("ul");
    modalUL.className = "modal-ul";
    for (let i = 0; i < ulItems.length; i++) {
        const li = document.createElement("li");
        li.innerText = ulItems[i];
        modalUL.appendChild(li);
    }
    modalContainer.appendChild(modalUL);

    // Create Button Container Div --
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "modal-buttons-div";
    modalContainer.appendChild(buttonsDiv);

    // Create Accept Button --
    const acceptFedExButton = document.createElement("a");
    acceptFedExButton.className = "sig-button";
    acceptFedExButton.onclick = userAcceptFedEx;
    acceptFedExButton.innerText = modalAcceptWords;
    buttonsDiv.appendChild(acceptFedExButton);

    // Create Decline Button --
    const declineFedExButton = document.createElement("a");
    declineFedExButton.className = "decline-sig-button";
    declineFedExButton.onclick = userFirstDeclineFedEx;
    declineFedExButton.innerText = modalDeclineWords;
    buttonsDiv.appendChild(declineFedExButton);

    // Create Fine Print Text --
    const modalFinePrint = document.createElement("p");
    modalFinePrint.className = "fine-print";
    modalFinePrint.innerText = modalFinePrintWords;
    modalContainer.appendChild(modalFinePrint);

}

const deliveryMethod = localStorage.getItem("activeDeliveryChannel");

if (deliveryMethod === "delivery") {
    const userModalTime = Number(localStorage.getItem("userModalTime"));
    const rightNow = Date.now();
    const delta = rightNow - userModalTime

    if (delta > modalTimer) showFedExModal();
}