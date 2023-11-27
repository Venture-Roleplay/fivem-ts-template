import * as NativeUI from "../../lib/nativeui/nativeui";
import { DisableControls } from "./menuDisableControls";
import HandleControls from "./menuHandleControls";
let Menus: NativeUI.Menu[] = [];

let lastKnownMenu: string = "";

export function ProcessMenus() {
    Menus.forEach((menu) => {
        switch (menu?.Visible) {
            case true:
                DisableControls();
                HandleControls(menu);
                if (lastKnownMenu !== menu.Title) {
                    lastKnownMenu = menu.Title;
                    console.log(`Menu opened: ${menu.Title}`);
                }
                break;
        }
    });
}

interface MenuProps {
    title: string;
    subtitle: string;
    align?: "left" | "right";
    spriteLibrary?: string;
    spriteName?: string;
}
export function createMenu(props: MenuProps) {
    const align =
        props.align === "left"
            ? new NativeUI.Point(20, 20)
            : new NativeUI.Point(1460, 20);
    let menu = new NativeUI.Menu(
        props.title,
        props.subtitle,
        align,
        props.spriteLibrary,
        props.spriteName
    );
    Menus.push(menu);
    return menu;
}

interface MenuItemProps {
    text: string;
    description?: string;
    data?: any;
}
export function createItem(props: MenuItemProps) {
    let item = new NativeUI.UIMenuItem(
        props.text,
        props.description,
        props.data
    );
    return item;
}

interface MenuCheckboxItemProps {
    text: string;
    description?: string;
    checked?: boolean;
}
export function createCheckboxItem(props: MenuCheckboxItemProps) {
    let item = new NativeUI.UIMenuCheckboxItem(
        props.text,
        props.checked,
        props.description
    );
    return item;
}

interface MenuListItemProps {
    text: string;
    description?: string;
    items: string[];
    index?: number;
}
export function createListItem(props: MenuListItemProps) {
    let item = new NativeUI.UIMenuListItem(
        props.text,
        props.description,
        new NativeUI.ItemsCollection(props.items),
        props.index
    );
    return item;
}

interface MenuSliderItemProps {
    text: string;
    description?: string;
    items: string[];
    index: number;
}
export function createSliderItem(props: MenuSliderItemProps) {
    let item = new NativeUI.UIMenuSliderItem(
        props.text,
        props.items,
        props.index,
        props.description
    );
    return item;
}

export function isAnyMenuOpen() {
    return Menus.some((menu) => menu.Visible);
}

export function closeAllMenus() {
    Menus.forEach((menu) => {
        if (menu.Visible) {
            menu.Close();
        }
    });
}
