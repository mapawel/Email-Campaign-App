type validatorParamsType = 'minLength' | 'maxLength';

type validatorsObjectType<A extends string | number | symbol> = Record<
    'template',
    Record<A, Record<string, number>>
>;

export function buildValidatorKeyParamsGetter<validatingEntity>({
    entityName,
    validatorsObject,
}: {
    entityName: keyof typeof validatorsObject;
    validatorsObject: validatorsObjectType<keyof validatingEntity>;
}): (key: keyof validatingEntity, param: validatorParamsType) => number | null {
    return (
        key: keyof validatingEntity,
        param: validatorParamsType,
    ): number | null => {
        return validatorsObject?.[entityName]?.[key]?.[param] || null;
    };
}
