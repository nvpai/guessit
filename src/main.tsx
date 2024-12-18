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
    // const [right, setCounter] = useState(0);
    
    const generateRandomRGBColors = (count: number): string[] => {
      const randomColor = () =>
        `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
      return Array.from({ length: count }, randomColor);
    };
    
    
    const randomColors = generateRandomRGBColors(3);

    const colorsOption = [...randomColors]
    const pickRandomColor = () => {
      const index = Math.floor(Math.random() * randomColors.length); 
      const color = randomColors[index]; 
      randomColors.splice(index, 1); 
      return color;
    };
    
    return (
      <blocks>
        
        <vstack backgroundColor='#fff5ee' height="100%" width="100%" gap="medium" alignment="center middle">
          <text alignment="bottom center" color="#6a5acd" weight="bold" size="xxlarge">{`Guess the sequence of color blocks`}</text>
          <hstack gap="medium" alignment="center middle">
              {Array.from({ length: 3 }).map((_, index) => (
              <vstack
                key={`block-${index}`}
                id={`block-${index + 1}`}
                height="40px"
                width="40px"
                backgroundColor={pickRandomColor()}
                alignment="center middle"
              >
                
              </vstack>
            ))}

          </hstack>
          
          <text alignment="top end" color="#6a5acd" weight="bold" size="xxlarge">{`Select from the below`}</text>
          
          <hstack gap="small" alignment="center middle">
            {colorsOption.map((color, index) => (
              <hstack
                key={`color-option-${index}`}
                height="40px"
                width="40px"
                backgroundColor={color} 
                alignment="center middle"
              >
                
              </hstack>
            ))}
          </hstack>
        </vstack>

        
        
        
        


      </blocks>
    );
  },
});

export default Devvit;
