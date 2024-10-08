import React from "react";
import AppInner from "./AppInner";
import AppContainer from "./AppContainer";
import styles from "@/(FSD)/shareds/styles/AppStyle.module.scss";
import LinkBtnShared from "@/(FSD)/shareds/ui/LinkBtnShared";
import TextXSmallShared from "@/(FSD)/shareds/ui/TextXSmallShared";
import IconShared from "@/(FSD)/shareds/ui/IconShared";

const AppNav = () => {
    return (
        <nav className={`border-default-100 border-t-small ${styles.nav}`}>
            <AppContainer>
                <AppInner>
                    <div className={styles.inner}>
                        <LinkBtnShared href={"/"} data-hover={false} disableAnimation>
                            <IconShared iconType={"home"} />
                            <TextXSmallShared>홈</TextXSmallShared>
                        </LinkBtnShared>
                        <LinkBtnShared href={"/mypage"} data-hover={false} disableAnimation>
                            <IconShared iconType={"person"} />
                            <TextXSmallShared>마이</TextXSmallShared>
                        </LinkBtnShared>
                    </div>
                </AppInner>
            </AppContainer>

        </nav >
    );
};

export default AppNav;