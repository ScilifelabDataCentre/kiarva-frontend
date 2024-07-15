import { ReactElement } from 'react';
import { TrackPageViewIfEnabled } from '../util/cookiesHandling';
import { BODY_CLASSES, H_1 } from '../constants';
import ChangeLogComponent from '../components/ChangeLogComponent';

export default function ChangeLogPage(): ReactElement {
    TrackPageViewIfEnabled();

    var pageTitle: string = "Change log";

    return (
        <div className={BODY_CLASSES + " py-16"}>
            <div className={H_1}>{pageTitle}</div>
            <div className="alert my-10 py-8">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 stroke-current">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div className='flex flex-col'>
            <label className="font-bold">How to use the change log</label>
            <span>The change log displays all releases of the KI Adaptive Immune Receptor Variant Atlas. Each versions card has a DOI and two buttons labelled ‘Frontend Repository’ and ‘Backend Repository’. Clicking one of the buttons in the current version card will open the corresponding GitHub repository. Clicking one of the buttons in the previous versions card will start a download of the source code of the selected version. Follow the instructions in the readme file to locally run the selected version.</span>
            </div>
            </div>

            <div className="divider pt-4">Current version</div>
            <div className='pt-2 pb-4'>
            <ChangeLogComponent 
                    title="Version 3.0"
                    databaseUpdates={[
                        "Change 1",
                        "Change 2. Ut rhoncus ante in metus lobortis, eu euismod magna dignissim. Duis nec condimentum purus. Quisque urna enim, placerat non fermentum sed, pharetra sit amet quam. Ut rhoncus ante in metus lobortis, eu euismod magna dignissim. Duis nec condimentum purus. Quisque urna enim, placerat non fermentum sed, pharetra sit amet quam. Ut rhoncus ante in metus lobortis, eu euismod magna dignissim.",
                        "Change 3",
                    ]}
                    designAndBugFixes={[
                        "Change 1",
                        "Change 2. Ut rhoncus ante in metus lobortis, eu euismod magna dignissim. Duis nec condimentum purus. Quisque urna enim, placerat non fermentum sed, pharetra sit amet quam. Ut rhoncus ante in metus lobortis, eu euismod magna dignissim. Duis nec condimentum purus. Quisque urna enim, placerat non fermentum sed, pharetra sit amet quam. Ut rhoncus ante in metus lobortis, eu euismod magna dignissim.",
                        "Change 3",
                    ]}
                    isCurrent={true}
                    frontEndLink='https://github.com/ScilifelabDataCentre/immunediscover-service-frontend'
                    backEndLink='https://github.com/ScilifelabDataCentre/immunediscover-service-backend'
                />
            </div>
            <div className="divider pt-4">Previous versions</div>
            <div className='pt-2 pb-4'>
            <ChangeLogComponent
                    title="Version 2.1"
                    databaseUpdates="Let's see
                    what happens when we have a very long string
                    And new rows"
                    designAndBugFixes="New test here"
                    isCurrent={false}
                    frontEndLink='https://github.com/ScilifelabDataCentre/immunediscover-service-frontend'
                    backEndLink='https://github.com/ScilifelabDataCentre/immunediscover-service-backend'
                />
          <ChangeLogComponent 
                    title="Version 2.0"
                    databaseUpdates="Let's see
                    what happens when we have a very long string
                    And new rows"
                    designAndBugFixes="New test here"
                    isCurrent={false}
                    frontEndLink='https://github.com/ScilifelabDataCentre/immunediscover-service-frontend'
                    backEndLink='https://github.com/ScilifelabDataCentre/immunediscover-service-backend'
                />
            </div>
            <div className='py-4'>
            <ChangeLogComponent
                    title="Version 1.1"
                    databaseUpdates="Let's see
                    what happens when we have a very long string
                    And new rows"
                    designAndBugFixes="New test here"
                    isCurrent={false}
                    frontEndLink='https://github.com/ScilifelabDataCentre/immunediscover-service-frontend'
                    backEndLink='https://github.com/ScilifelabDataCentre/immunediscover-service-backend'
                />
          <ChangeLogComponent 
                    title="Version 1.0"
                    databaseUpdates="Let's see
                    what happens when we have a very long string
                    And new rows"
                    designAndBugFixes="New test here"
                    isCurrent={false}
                    frontEndLink='https://github.com/ScilifelabDataCentre/immunediscover-service-frontend'
                    backEndLink='https://github.com/ScilifelabDataCentre/immunediscover-service-backend'
                />
            </div>
        </div>
    );
}