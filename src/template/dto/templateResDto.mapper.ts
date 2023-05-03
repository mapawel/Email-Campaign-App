export const templateResDtoMapper = (templateEntity) => {
    return {
        id: templateEntity.id,
        name: templateEntity.name,
        description: templateEntity.description,
        createdBy: templateEntity.createdBy,
        createdAt: templateEntity.createdAt,
        updatedBy: templateEntity.updatedBy,
        updatedAt: templateEntity.updatedAt,
        fileId: templateEntity.fileId,
        campaigns: templateEntity.campaigns,
    };
};
