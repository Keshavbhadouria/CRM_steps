export class PermissionTreeEditModel {
    permissions: FlatPermissionDto[];

    grantedPermissionNames: string[];
}

export class FlatPermissionDto {
    parentName!: string | undefined;
    name!: string | undefined;
    displayName!: string | undefined;
    description!: string | undefined;
    isGrantedByDefault!: boolean;

    constructor(data?: FlatPermissionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}