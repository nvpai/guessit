// Learn more at developers.reddit.com/docs
import { Devvit, useState } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
});

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: 'Add my post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showToast("Submitting your post - upon completion you'll navigate there.");

    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: 'Game',
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.navigateTo(post);
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  name: 'Experience Post',
  height: 'regular',
  render: (_context) => {
    const [right, setCounter] = useState(0);

    return (
      <blocks>
        
        <vstack backgroundColor='#fff5ee' height="100%" width="100%" gap="medium" alignment="center middle">
          <text alignment="bottom center" color="#6a5acd" weight="bold" size="xxlarge">{`Guess the sequence of color blocks`}</text>
          <hstack gap="medium" alignment="center middle">
            <vstack height="40px" width="100px" backgroundColor="red" alignment="center middle">
            {/* <button size="medium" width="50px" >Option 1</button>
            <spacer size="medium" />
            <button size="medium" appearance="secondary">Option 2</button>
            <button size="medium" appearance="secondary">Option 3</button> */}
            </vstack>
          </hstack>
          
          
          {/* <image
            url="logo.png"
            description="logo"
            imageHeight={256}
            imageWidth={256}
            height="48px"
            width="48px"
          /> */}
          {/* <button appearance="primary" onPress={() => setCounter((counter) => counter + 1)}>
            Button!
          </button> */}
        </vstack>
      </blocks>
    );
  },
});

export default Devvit;
