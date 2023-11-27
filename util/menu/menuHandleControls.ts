import { Control } from "../../lib/nativeui/nativeui";
import {
    Menu,
    UIMenuListItem,
    UIMenuSliderItem,
} from "../../lib/nativeui/nativeui";
import PlayMenuSound from "./menuSound";

let lastActionTime = GetGameTimer();

let lastAction = {
    up: GetGameTimer(),
    down: GetGameTimer(),
    select: GetGameTimer(),
    back: GetGameTimer(),
};

export default function HandleControls(currentMenu: Menu) {
    if (
        IsDisabledControlJustReleased(0, Control.FrontendAccept) ||
        IsDisabledControlJustReleased(0, Control.VehicleMouseControlOverride)
    ) {
        if (currentMenu.Visible) {
            if (lastAction.select + 50 < GetGameTimer()) {
                PlayMenuSound("SELECT");
                currentMenu.SelectItem();
                lastAction.select = GetGameTimer();
            }
        }
    }

    if (
        IsDisabledControlJustPressed(0, Control.PhoneCancel) ||
        IsControlJustPressed(0, Control.PhoneCancel)
    ) {
        if (currentMenu.Visible) {
            if (lastAction.back + 50 < GetGameTimer()) {
                PlayMenuSound("BACK");
                currentMenu.GoBack();
                lastAction.back = GetGameTimer();
            }
        }
    }

    HandleUpNavigation(currentMenu);
    HandleDownNavigation(currentMenu);
    HandleLeftNavigation(currentMenu);
    HandleRightNavigation(currentMenu);
}

function IsUpPressed() {
    const ped = PlayerPedId();
    const InVehicle = IsPedInAnyVehicle(ped, false);

    // when the player is holding TAB, while not in a vehicle, and when the scrollwheel is being used, return false to prevent interferring with weapon selection.
    if (!InVehicle && IsControlPressed(0, Control.SelectWeapon)) {
        if (
            IsControlPressed(0, Control.SelectNextWeapon) ||
            IsControlPressed(0, Control.SelectPrevWeapon)
        ) {
            return false;
        }
    }

    // return true if the scrollwheel up or the arrow up key is being used at this frame.
    if (
        IsControlPressed(0, Control.FrontendUp) ||
        IsDisabledControlPressed(0, Control.FrontendUp) ||
        IsControlPressed(0, Control.PhoneScrollBackward) ||
        IsDisabledControlPressed(0, Control.PhoneScrollBackward)
    ) {
        return true;
    }

    return false;
}

function IsDownPressed() {
    const ped = PlayerPedId();
    const InVehicle = IsPedInAnyVehicle(ped, false);

    // when the player is holding TAB, while not in a vehicle, and when the scrollwheel is being used, return false to prevent interferring with weapon selection.
    if (!InVehicle && IsControlPressed(0, Control.SelectWeapon)) {
        if (
            IsControlPressed(0, Control.SelectNextWeapon) ||
            IsControlPressed(0, Control.SelectPrevWeapon)
        ) {
            return false;
        }
    }

    // return true if the scrollwheel down or the arrow down key is being used at this frame.
    if (
        IsControlPressed(0, Control.FrontendDown) ||
        IsDisabledControlPressed(0, Control.FrontendDown) ||
        IsControlPressed(0, Control.PhoneScrollForward) ||
        IsDisabledControlPressed(0, Control.PhoneScrollForward)
    ) {
        return true;
    }

    return false;
}

let lastTimeUpPressed = GetGameTimer();
function HandleUpNavigation(currentMenu: Menu) {
    // Update the currently selected item to the new one.
    if (
        IsControlJustPressed(0, Control.FrontendUp) ||
        IsControlJustPressed(0, Control.PhoneScrollBackward)
    ) {
        PlayMenuSound("NAV_UP_DOWN");
        currentMenu.GoUp();
        lastTimeUpPressed = GetGameTimer();
        return;
    }

    // Get the current game time.
    let delay = 200;

    // Do the following as long as the controls are being pressed.
    if (IsUpPressed() && currentMenu.Visible) {
        // Check if the game time has changed by "delay" amount.
        if (GetGameTimer() - lastTimeUpPressed > delay) {
            // Update the currently selected item to the new one.
            PlayMenuSound("NAV_UP_DOWN");
            currentMenu.GoUp();

            // Reset the time to the current game timer.
            lastTimeUpPressed = GetGameTimer();
        }
    }
}

let lastTimeDownPressed = GetGameTimer();
function HandleDownNavigation(currentMenu: Menu) {
    // Update the currently selected item to the new one.
    if (
        IsControlJustPressed(0, Control.FrontendDown) ||
        IsControlJustPressed(0, Control.PhoneScrollForward)
    ) {
        PlayMenuSound("NAV_UP_DOWN");
        currentMenu.GoDown();
        lastTimeDownPressed = GetGameTimer();
        return;
    }

    // Get the current game time.
    let delay = 200;

    // Do the following as long as the controls are being pressed.
    if (IsDownPressed() && currentMenu.Visible) {
        // Check if the game time has changed by "delay" amount.
        if (GetGameTimer() - lastTimeDownPressed > delay) {
            // Update the currently selected item to the new one.
            PlayMenuSound("NAV_UP_DOWN");
            currentMenu.GoDown();

            // Reset the time to the current game timer.
            lastTimeDownPressed = GetGameTimer();
        }
    }
}

let lastTimeLeftPressed = GetGameTimer();
function HandleLeftNavigation(currentMenu: Menu) {
    let item = currentMenu.MenuItems[currentMenu.CurrentSelection];
    if (item.Enabled) {
        if (IsControlJustPressed(0, Control.FrontendLeft)) {
            if (
                item instanceof UIMenuListItem ||
                item instanceof UIMenuSliderItem
            ) {
                PlayMenuSound("NAV_UP_DOWN");
                currentMenu.GoLeft();
                lastTimeLeftPressed = GetGameTimer();
                return;
            }
        }

        let delay = 200;

        if (
            (IsDisabledControlPressed(0, Control.PhoneLeft) ||
                IsControlPressed(0, Control.PhoneLeft)) &&
            currentMenu.Visible
        ) {
            if (GetGameTimer() - lastTimeLeftPressed > delay) {
                if (
                    item instanceof UIMenuListItem ||
                    item instanceof UIMenuSliderItem
                ) {
                    PlayMenuSound("NAV_UP_DOWN");
                    currentMenu.GoLeft();
                    lastTimeLeftPressed = GetGameTimer();
                }
            }
        }
    }
}

let lastTimeRightPressed = GetGameTimer();
function HandleRightNavigation(currentMenu: Menu) {
    let item = currentMenu.MenuItems[currentMenu.CurrentSelection];
    if (item.Enabled) {
        if (IsControlJustPressed(0, Control.FrontendRight)) {
            if (
                item instanceof UIMenuListItem ||
                item instanceof UIMenuSliderItem
            ) {
                PlayMenuSound("NAV_UP_DOWN");
                currentMenu.GoRight();
                lastTimeRightPressed = GetGameTimer();
                return;
            }
        }

        let delay = 200;

        if (
            (IsDisabledControlPressed(0, Control.PhoneRight) ||
                IsControlPressed(0, Control.PhoneRight)) &&
            currentMenu.Visible
        ) {
            if (GetGameTimer() - lastTimeRightPressed > delay) {
                if (
                    item instanceof UIMenuListItem ||
                    item instanceof UIMenuSliderItem
                ) {
                    PlayMenuSound("NAV_UP_DOWN");
                    currentMenu.GoRight();
                    lastTimeRightPressed = GetGameTimer();
                }
            }
        }
    }
}
