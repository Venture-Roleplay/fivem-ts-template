export default function PlayMenuSound(
    sound: "NAV_UP_DOWN" | "SELECT" | "BACK" | "ERROR"
) {
    switch (sound) {
        case "NAV_UP_DOWN":
            PlaySoundFrontend(
                -1,
                "NAV_UP_DOWN",
                "HUD_FRONTEND_DEFAULT_SOUNDSET",
                false
            );
            break;
        case "SELECT":
            PlaySoundFrontend(
                -1,
                "SELECT",
                "HUD_FRONTEND_DEFAULT_SOUNDSET",
                false
            );
            break;
        case "BACK":
            PlaySoundFrontend(
                -1,
                "BACK",
                "HUD_FRONTEND_DEFAULT_SOUNDSET",
                false
            );
            break;
        case "ERROR":
            PlaySoundFrontend(
                -1,
                "ERROR",
                "HUD_FRONTEND_DEFAULT_SOUNDSET",
                false
            );
            break;
    }
}
