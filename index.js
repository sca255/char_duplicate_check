// The main script for the extension
// The following are examples of some basic extension functionality

//You'll likely need to import extension_settings, getContext, and loadExtensionSettings from extensions.js
import { extension_settings, getContext, loadExtensionSettings } from "../../../extensions.js";

//You'll likely need to import some other functions from the main script
import { saveSettingsDebounced,deleteCharacter} from "../../../../script.js";

// Keep track of where your extension is located, name should match repo name
const extensionName = "char_duplicate_check";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;
const extensionSettings = extension_settings[extensionName];
const defaultSettings = {};


 
// Loads the extension settings if they exist, otherwise initializes them to the defaults.
async function loadSettings() {
  //Create the settings if they don't exist
  extension_settings[extensionName] = extension_settings[extensionName] || {};
  if (Object.keys(extension_settings[extensionName]).length === 0) {
    Object.assign(extension_settings[extensionName], defaultSettings);
  }

  // Updating settings in the UI
  $("#example_setting").prop("checked", extension_settings[extensionName].example_setting).trigger("input");
}

// This function is called when the extension settings are changed in the UI
function onExampleInput(event) {
  const value = Boolean($(event.target).prop("checked"));
  extension_settings[extensionName].example_setting = value;
  saveSettingsDebounced();
}
var ctx=getContext()
// This function is called when the button is clicked
function onButtonClick() {
  let chars=ctx.characters;
  for (let i in chars){
    let i2=ctx.characters[i]
    console.log(i2)

    if (i2.avatar.endsWith("1.png")||i2.avatar.endsWith("2.png")||i2.avatar.endsWith("3.png")||i2.avatar.endsWith("4.png")||i2.avatar.endsWith("5.png")||i2.avatar.endsWith("6.png")||i2.avatar.endsWith("7.png")||i2.avatar.endsWith("8.png")||i2.avatar.endsWith("9.png")){
      deleteCharacter(i2.avatar)
    }
  }

}

// This function is called when the extension is loaded
jQuery(async () => {
  // This is an example of loading HTML from a file
  const settingsHtml = await $.get(`${extensionFolderPath}/example.html`);

  // Append settingsHtml to extensions_settings
  // extension_settings and extensions_settings2 are the left and right columns of the settings menu
  // Left should be extensions that deal with system functions and right should be visual/UI related 
  $("#extensions_settings").append(settingsHtml);

  // These are examples of listening for events
  $("#task").on("click", onButtonClick);
  $("#example_setting").on("input", onExampleInput);

  // Load settings when starting things up (if you have any)
  loadSettings();
});
