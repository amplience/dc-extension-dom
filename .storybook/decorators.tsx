import React from 'react';
import { withTheme } from "unofficial-dynamic-content-ui"
import { WithTreeSpec } from '../src/components/WithTreeSpec/WithTreeSpec';
import { TreeSpec } from '../src/model';
import { COMPONENTS } from '../src/fixtures';

export const theme = (story: any) => {
    return withTheme(story());
}

const spec = new TreeSpec(COMPONENTS);

export const fixtures = (story: any) => {
    return <WithTreeSpec value={spec}>
        {story()}
    </WithTreeSpec>
}

export const iconFont = (story: any) => {
    return <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        {story()}
    </>
}