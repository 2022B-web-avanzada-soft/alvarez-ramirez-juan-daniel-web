import React from 'react';
import { App, Page, Navbar, BlockTitle, List, ListItem} from 'konsta/react';

export default function KonstaComponentTest() {
  return (
    <App theme="material">
      <Page>
        <Navbar title="My App" />

        <BlockTitle>Simple List</BlockTitle>
        <List>
            <ListItem title="Item 1" />
            <ListItem title="Item 2" />
            <ListItem title="Item 3" />
        </List>
      </Page>
    </App>
  );
}