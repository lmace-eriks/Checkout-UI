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

// devEnv is used for internal testing. Sets timeSinceLastModal
// to 5 seconds for internal and 30 minutes for live production.
// See logUserTime() notes --
const devEnv = localStorage.getItem("localDevEnv") === "true" ? true : false;
const timeSinceLastModal = devEnv ? 5000 : 1800000;

let modalActive = false;
const showFedExModal = () => {
    modalActive = true;

    // Snaps window to top of page to view modal --
    window.scrollTo(0, 0);

    const closeModal = () => {
        modalActive = false;
        modalBackground.remove();
        clearInterval(everyTwoSeconds);
    }

    // User clicks Sign Me Up. Opens new page, clears the timeout function --
    const userAcceptFedEx = () => {
        logUserTime();
        window.open(goToFedExLink, "_blank");
        closeModal();
    }

    // User clicks Decline, Shows confirmation content --
    const userFirstDeclineFedEx = () => {
        showConfirmModal();
    }

    // I Still Want to Decline function --
    const userSecondDeclineFedEx = () => {
        logUserTime();
        closeModal();
    }

    // Changes modal to the "Are You Sure?" content --
    const showConfirmModal = () => {
        modalUL.remove();
        modalFinePrint.remove();
        modalTitle.innerText = confirmTitleWords;
        modalParagraph.innerText = confirmParagraphWords;
        acceptFedExButton.innerText = confirmAcceptButtonWords;
        declineFedExButton.innerText = confirmDeclineButtonWords;
        declineFedExButton.onclick = userSecondDeclineFedEx;
    }

    // Logs the time for user confirm or deny. This prevents the user
    // from seeing the modal multiple times per session if they switch
    // back and forth between delivery and pickup. Also if they are viewing
    // their cart multiple times within a half hour --
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

// Checks every two seconds if modal should display. There is no clear "listener" for if the
// user has clicked "delivery" so this is the workaround. This is a fallback for if the default
// option for a user is "pickup" and then they change to "delivery". Will not display more than once per
// half hour. Sets a localStorage variable called "userModalTime" and checks to see when the last
// time a user has made a selection in the modal. Once the user makes a selection the timer stops running --
const everyTwoSeconds = setInterval(() => {
    const deliveryMethod = localStorage.getItem("activeDeliveryChannel");
    const userModalTime = Number(localStorage.getItem("userModalTime"));
    const rightNow = Date.now();
    const delta = rightNow - userModalTime;

    if (deliveryMethod === "delivery" && !modalActive && delta > timeSinceLastModal) {
        showFedExModal();
    }
}, 2000);