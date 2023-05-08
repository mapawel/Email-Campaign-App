type validatorParamsType = 'minLength' | 'maxLength';

type validatorsObjectType = Record<
    'template' | 'campaign',
    Record<any, Record<string, number>>
>;

export function buildValidatorKeyParamsGetter<validatingEntity>({
    entityName,
    validatorsObject,
}: {
    entityName: keyof typeof validatorsObject;
    validatorsObject: validatorsObjectType;
}): (key: keyof validatingEntity, param: validatorParamsType) => number | null {
    return (
        key: keyof validatingEntity,
        param: validatorParamsType,
    ): number | null => {
        return validatorsObject?.[entityName]?.[key]?.[param] || null;
    };
}
