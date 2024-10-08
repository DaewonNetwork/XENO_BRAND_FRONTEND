import React from "react";
import styles from "@/(FSD)/shareds/styles/AppStyle.module.scss";
import LogoShared from "@/(FSD)/shareds/ui/LogoShared";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import LinkBtnShared from "@/(FSD)/shareds/ui/LinkBtnShared";
import AppInner from "./AppInner";
import AppContainer from "./AppContainer";


const AppHeader = () => {
    return (
        <header className={`border-default-100 border-b-small ${styles.header}`}>
            <AppContainer>
                <AppInner>
                    <div className={styles.inner}>
                        <LogoShared />
                        <div className={styles.buttons}>
                            <LinkBtnShared href={"/search"} size={"sm"} isIconOnly endContent={<IconShared iconSize={"md"} iconType={"search"} />} />
                           
                        </div>
                    </div>
                </AppInner>
            </AppContainer>
        </header>
    );
};

export default AppHeader;