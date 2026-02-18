import { backendAPI } from "@/constants";
import axios from "axios";

// geneSelectionEndpoint: backendAPI + "data/plotoptions?current_selection=",
export async function getDbName(selection: string, axiosConfig: { headers: { "X-api-key": string; }; }): Promise<string> {
    const encodedSelection = encodeURIComponent(selection);
    const dbNameEndpoint =
      backendAPI + "/data/db_name" + "?selection=" + encodedSelection;

    let dbName: string = "";
    await axios
      .get(dbNameEndpoint, axiosConfig)
      .then((response) => {
        dbName = response.data.db_name;
      })
      .catch((response) => console.log(response.error));

      return dbName;
  }