## TPIFE (Text Parser Interactive Fiction "Engine")

---

```
** Disclaimer **

I made this project primarily for myself and my IF writing, but i'm sharing it in hope someone else will find it useful as well.

This project is meant for people who want to write interactive fiction stories in javascript. It's not comprehensive as some other IF engines but you can definitely make something with it.

I want to add more features to it, so there is still more to come.
```

TPIFE is a framework for writing IF stories in Javascript. It is made with [SvelteKit](https://kit.svelte.dev/).

In order to run it locally do the following:

1. Get this repo
2. run `npm install`
3. run `npm run dev`

## Writing stories

---

| Folder     | Description                                                                                                                                                                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| disk-drive | This folder contains default configuration file (`config.ts`) and default 'disk-drive' file (`index.ts`). Think of disk drive as a console where you need to insert a game disk. You can do so by opening `index.ts` in this folder, and exporting your game (see games folder) |
| games      | This is where you'll write your IF. For every game you can make a folder here and inside it you can have any folder structure you want (see example game "lighthouse"). Only important thig is to export your game so that it can be "inserted" into the game disk.             |

In TPIFE, games are divided into scenes and each scene has actions. Actions are triggered on user input (for example when user types 'look'). There are also inventory actions which can be triggered in any scene.

Example game structure:

```
const myNewGame = <IGame>{
  scenes: <IScene>[],
  inventoryActions: <IAction>[]
}

export default myNewGame;
```

TODO
