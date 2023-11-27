import { Control } from "../../lib/nativeui/nativeui";

export function DisableControls() {
    DisableGenericControls();
    DisableAttackControls();
    DisablePhoneAndArrowKeysInputs();
    DisableRadioInputs();
}

function DisableGenericControls() {
    const ped = PlayerPedId();
    const UsingKeyboard = IsUsingKeyboard(0);
    const isInVehicle = IsPedInAnyVehicle(ped, false);

    if (!UsingKeyboard) {
        DisableControlAction(0, Control.MultiplayerInfo, true);

        // When in vehicle
        if (isInVehicle) {
            DisableControlAction(0, Control.VehicleHeadlight, true);
            DisableControlAction(0, Control.VehicleDuck, true);

            // toggles boost in some dlc vehicles, hence it's disabled for controllers only
            DisableControlAction(0, Control.VehicleFlyTransform, true);
        }
    } else {
        DisableControlAction(0, Control.FrontendPauseAlternate, true); // Disable the escape key opening pause menu

        // Disable the scrollwheel button changing weapons while the menu is open
        if (!IsControlPressed(0, Control.SelectWeapon)) {
            DisableControlAction(24, Control.SelectNextWeapon, true);
            DisableControlAction(24, Control.SelectPrevWeapon, true);
        }
    }

    DisableControlAction(0, Control.FrontendAccept, true);
    DisableControlAction(0, Control.VehicleMouseControlOverride, true);
    DisableControlAction(0, Control.VehicleSelectNextWeapon, true);
}

function DisableAttackControls() {
    DisableControlAction(0, Control.Attack, true);
    DisableControlAction(0, Control.Attack2, true);
    DisableControlAction(0, Control.MeleeAttack1, true);
    DisableControlAction(0, Control.MeleeAttack2, true);
    DisableControlAction(0, Control.MeleeAttackAlternate, true);
    DisableControlAction(0, Control.MeleeAttackHeavy, true);
    DisableControlAction(0, Control.MeleeAttackLight, true);
    DisableControlAction(0, Control.VehicleAttack, true);
    DisableControlAction(0, Control.VehicleAttack2, true);
    DisableControlAction(0, Control.VehicleFlyAttack, true);
    DisableControlAction(0, Control.VehiclePassengerAttack, true);
    DisableControlAction(0, Control.Aim, true);
    DisableControlAction(0, Control.VehicleAim, true);
}

function DisablePhoneAndArrowKeysInputs() {
    DisableControlAction(0, Control.Phone, true);
    DisableControlAction(0, Control.PhoneCancel, true);
    DisableControlAction(0, Control.PhoneDown, true);
    DisableControlAction(0, Control.PhoneLeft, true);
    DisableControlAction(0, Control.PhoneRight, true);
}

function DisableRadioInputs() {
    DisableControlAction(0, Control.RadioWheelLeftRight, true);
    DisableControlAction(0, Control.RadioWheelUpDown, true);
    DisableControlAction(0, Control.VehicleRadioWheel, true);
    DisableControlAction(0, Control.VehicleNextRadio, true);
    DisableControlAction(0, Control.VehiclePrevRadio, true);
}
