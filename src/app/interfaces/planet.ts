export interface Planet {
    id: string;
    name: string;
    size: string;
    star: {
        id: string;
        name: string;
        density: string;
    };
}
