/**
 * Regras de dano do Fallout TTRPG (fan made).
 *
 * - Se o alvo percebe a fonte do dano, o dano sai da Estamina primeiro.
 * - Com Estamina 0 (ou se o alvo está inconsciente/sem ciência), o dano vai
 *   para os HP.
 * - A Tolerância a Dano (DT) reduz apenas o dano que chega aos HP e o
 *   resultado nunca fica abaixo de 0.
 */
export interface DamageTarget {
    stamina: number;
    dt: number;
}

export interface DamageOptions {
    /** O alvo percebe a fonte do dano? Se não, tudo vai direto nos HP. */
    aware: boolean;
    /**
     * Se verdadeiro, o dano que passa da Estamina restante continua para os HP.
     * Se falso, um golpe sofrido com Estamina > 0 é inteiramente absorvido por ela.
     */
    overflow: boolean;
}

export interface DamageResult {
    /** Quanto foi descontado da Estamina. */
    stamina: number;
    /** Quanto foi descontado dos HP, já depois da DT. */
    hp: number;
    /** Quanto a DT bloqueou. */
    reduced: number;
}

export function resolveDamage(
    target: DamageTarget,
    amount: number,
    options: DamageOptions
): DamageResult {
    amount = Math.max(0, amount);
    const stamina = Math.max(0, target.stamina);
    const dt = Math.max(0, target.dt);

    let toStamina = 0;
    let toHP = amount;

    if (options.aware && stamina > 0) {
        toStamina = Math.min(stamina, amount);
        toHP = options.overflow ? amount - toStamina : 0;
    }

    const reduced = Math.min(dt, toHP);
    return {
        stamina: toStamina,
        hp: toHP - reduced,
        reduced
    };
}
