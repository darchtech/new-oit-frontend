import { useEffect } from "react";
import { loadScript } from "../../../globals/constants";
import SectionBranchInfo from "../../sections/company/branch/SectionBranchInfo";
import SectionContactInfo from "../../sections/company/branch/SectionContactInfo";


function KolhapurBranchPage() {
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

export default KolhapurBranchPage;

