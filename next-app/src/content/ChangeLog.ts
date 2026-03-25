import { currentVersion } from "@/constants"
import { changeLogData } from "@/interfaces/types";

export const changeLogCurrent: changeLogData = {
    version: currentVersion,
    frontendReleaseTag: "latest",
    backendReleaseTag: "latest",
    databaseUpdates: [],
    designAndBugFixes: [
        "Fixed minor typo/formating issue on citations page.",
        "Plot download buttons are no longer set to low opacity.",
        "Removed lime and purple colors, replaced with teal for design consistency.",
        "Added SVG-icon indicating a download to buttons on plot page.",
        "Updated Change Log page, clarifying versioning and adding correct repository links."
    ]

}

export const changeLogHistory: changeLogData[] = [
    {
        version: "1.0.0",
        frontendReleaseTag: "1.0.0",
        backendReleaseTag: "1.0.1",
        databaseUpdates: [
            "Initial release containing IGH data.",
        ],
        designAndBugFixes: [
            "Initial release.",
        ]
    },
];