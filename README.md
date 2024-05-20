<center>
<h3>بسم الله الرحمن الرحيم</h3>

<br />

<img src="images/banner.svg" style="border-radius: 6px;" />

<h3 style="font-size: 24px;"> React Quran</h3>

Easily add Quran viewer to your react applications!

</center>

<br />
<br />

## Installation

```bash
# via npm
npm install react-quran

# via yarn
yarn add react-quran

# via pnpm
pnpm add react-quran
```

## Features

-   ⚡ High-Quality Text Rendering: It doesn't use SVGs to render pages; it uses the official Hafs font of the Mushaf.
-   🎨 Customizable Layout: Easily adjust the styles to fit your app needs.
-   📦 Lightweight and Fast: Minimal impact on your app's performance.
-   📘 TypeScript support: It comes with TypeScript support!

## Usage

```jsx
// import styles; which imports the font of the quran.
import 'react-quran/fonts/index.css'

// import the ReadingView component
import { ReadingView } from 'react-quran'

const App = () => {
    return (
        <div>
            <ReadingView
                page={2}
                readingViewStyles={{
                    width: '512px',
                    maxWidth: '100%',
                    backgroundColor: 'hsl(200 5% 90% / 1)',
                    borderRadius: 8,
                }}
                surahTitleStyles={{
                    color: 'black',
                }}
                fixedAspectRation={true}
            />
        </div>
    )
}

export default App
```

## Contribute

Contributions are welcome! Feel free to submit [issues](https://github.com/6km/react-quran/issues) or [pull requests](https://github.com/6km/react-quran/pulls).
