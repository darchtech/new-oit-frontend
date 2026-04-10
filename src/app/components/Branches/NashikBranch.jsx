import { useEffect } from "react";
import { loadScript } from "../../../globals/constants";
import SectionBranchInfo from "../../sections/company/branch/section-branch-info";
import SectionContactInfo from "../../sections/company/branch/section-contact-info";

function NashikBranchPage() {
    useEffect(() => {
        loadScript("js/custom.js");
    }, []);

    return (
        <>
            <SectionBranchInfo />
            <SectionContactInfo />
        </>
    );
}

export default NashikBranchPage;
