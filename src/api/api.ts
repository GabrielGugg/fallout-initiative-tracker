import type { InitiativeViewState } from "src/tracker/view.types";
import type InitiativeTracker from "../main";
import { tracker } from "../tracker/stores/tracker";
import { type HomebrewCreature } from "src/types/creatures";
import { Creature } from "src/utils/creature";

declare module "obsidian" {
    interface Workspace {
        on(
            name: "fallout-ttrpg:should-save",
            callback: () => void
        ): EventRef;
        trigger(name: "fallout-ttrpg:should-save"): void;
        on(
            name: "fallout-ttrpg:save-state",
            callback: (state?: InitiativeViewState) => void
        ): EventRef;
        trigger(
            name: "fallout-ttrpg:save-state",
            state?: InitiativeViewState
        ): void;
        /** This event can be used to start an event by sending an object with a name, HP, AC, and initiative modifier at minimum. */
        on(
            name: "fallout-ttrpg:start-encounter",
            callback: (creatures: HomebrewCreature[]) => void
        ): EventRef;
        trigger(
            name: "fallout-ttrpg:start-encounter",
            creatures: HomebrewCreature[]
        ): void;
        on(
            name: "fallout-ttrpg:stop-viewing",
            callback: (creatures: HomebrewCreature[]) => void
        ): EventRef;
        trigger(name: "fallout-ttrpg:stop-viewing"): void;
        on(name: "fallout-ttrpg:unloaded", callback: () => void): EventRef;
        trigger(name: "fallout-ttrpg:unloaded"): void;
    }
}

declare global {
    interface Window {
        InitiativeTracker?: API;
    }
}

export class API {
    #tracker = tracker;
    constructor(public plugin: InitiativeTracker) {
        (window["InitiativeTracker"] = this) &&
            this.plugin.register(() => delete window["InitiativeTracker"]);
    }

    addCreatures(
        creatures: HomebrewCreature[],
        rollHP: boolean = this.plugin.data.rollHP
    ) {
        if (!creatures || !Array.isArray(creatures) || !creatures.length) {
            throw new Error("Creatures must be an array.");
        }
        this.#tracker.add(
            this.plugin,
            rollHP,
            ...creatures.map((c) => Creature.from(c))
        );
    }
    newEncounter(state?: InitiativeViewState) {
        if (state?.creatures) {
            state.creatures = state.creatures.map((c) =>
                Creature.from(c).toJSON()
            );
        }
        this.#tracker.new(this.plugin, state);
    }
}
