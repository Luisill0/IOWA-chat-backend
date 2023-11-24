export type Maybe<Type> = {
    [Property in keyof Type]?: Type[Property];
}