
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class LoginDto {
    ykiho?: Nullable<string>;
    saupkiho?: Nullable<string>;
}

export class UpdateCartItemInput {
    id: number;
    quantity: number;
}

export class CartItemDto {
    id?: Nullable<number>;
    cartId?: Nullable<number>;
    code: string;
    quantity: number;
    fit: boolean;
    createdDate?: Nullable<Date>;
    updatedDate?: Nullable<Date>;
}

export class CheckoutInput {
    paymentType: string;
    orderId: string;
    orderName: string;
    paymentKey: string;
    amount: number;
    quantity: number;
    items: CheckoutCartItemInput[];
}

export class CheckoutCartItemInput {
    code: string;
    name: string;
    fit: boolean;
    quantity: number;
    amount: number;
}

export class ProductFilter {
    jisa: string;
    bunryu?: Nullable<string>;
}

export abstract class IQuery {
    abstract getUser(): Nullable<User> | Promise<Nullable<User>>;

    abstract cartItemsCount(): number | Promise<number>;

    abstract getCart(): Nullable<Cart> | Promise<Nullable<Cart>>;

    abstract getCartWithProduct(): Nullable<Cart> | Promise<Nullable<Cart>>;

    abstract getPaymentWithItems(): Nullable<PaymentType[]> | Promise<Nullable<PaymentType[]>>;

    abstract getProductsBunryuList(filter?: Nullable<ProductFilter>): Nullable<Nullable<ProductsByBunryu>[]> | Promise<Nullable<Nullable<ProductsByBunryu>[]>>;

    abstract getCs(ykiho?: Nullable<string>, saupkiho?: Nullable<string>): Nullable<CsType> | Promise<Nullable<CsType>>;
}

export abstract class IMutation {
    abstract login(loginDto?: Nullable<LoginDto>): Nullable<AuthResult> | Promise<Nullable<AuthResult>>;

    abstract logout(): Nullable<AuthResult> | Promise<Nullable<AuthResult>>;

    abstract addToCart(item?: Nullable<CartItemDto>): CartResult | Promise<CartResult>;

    abstract updateCartItemQuantity(input: UpdateCartItemInput): UpdateResult | Promise<UpdateResult>;

    abstract deleteCartItem(id: number): DeleteResult | Promise<DeleteResult>;

    abstract deleteCartItems(ids: number[]): DeleteResult | Promise<DeleteResult>;

    abstract checkout(dto: CheckoutInput): Nullable<CheckoutResult> | Promise<Nullable<CheckoutResult>>;

    abstract cancelOrder(paymentId: number, paymentKey: string, cancelReason: string): Nullable<CheckoutResult> | Promise<Nullable<CheckoutResult>>;
}

export class AuthResult {
    message?: Nullable<string>;
}

export class User {
    jisa?: Nullable<string>;
    ykiho?: Nullable<string>;
    saupkiho?: Nullable<string>;
    name?: Nullable<string>;
    ceoName?: Nullable<string>;
    fitCherbang?: Nullable<boolean>;
    fitYoungsu?: Nullable<boolean>;
    exp?: Nullable<number>;
}

export class Cart {
    id: number;
    ykiho: string;
    cartItems?: Nullable<Nullable<CartItem>[]>;
}

export class CartResult {
    message: string;
}

export class CartItem {
    id?: Nullable<number>;
    cartId?: Nullable<number>;
    code: string;
    quantity: number;
    fit: boolean;
    createdDate?: Nullable<Date>;
    updatedDate?: Nullable<Date>;
    product?: Nullable<Product>;
}

export class Product {
    auto: number;
    jisa?: Nullable<string>;
    smCode?: Nullable<string>;
    smMyung?: Nullable<string>;
    smYmd?: Nullable<string>;
    danga?: Nullable<number>;
    danwi?: Nullable<string>;
    etc1?: Nullable<string>;
    etc2?: Nullable<string>;
    etc3?: Nullable<string>;
    etc4?: Nullable<string>;
    etc5?: Nullable<string>;
}

export class PaymentType {
    id: number;
    ykiho: string;
    orderId: string;
    paymentKey: string;
    method: string;
    amount: number;
    quantity: number;
    approvedAt: Date;
    sendType: string;
    cancel: boolean;
    paymentItems: PaymentItemType[];
}

export class PaymentItemType {
    id: number;
    paymentId: number;
    code: string;
    name: string;
    fit: boolean;
    quantity: number;
    amount: number;
}

export class CheckoutResult {
    success: boolean;
    errorCode?: Nullable<string>;
    errorMessage?: Nullable<string>;
    method?: Nullable<string>;
    approvedAt?: Nullable<Date>;
}

export class ProductsByBunryu {
    bunryu: string;
    products: Product[];
}

export class CsType {
    gubun?: Nullable<string>;
    code?: Nullable<string>;
    myung?: Nullable<string>;
    daepyo?: Nullable<string>;
    saupnum?: Nullable<string>;
    youngsu?: Nullable<string>;
    cherbang?: Nullable<string>;
}

export class UpdateResult {
    raw?: Nullable<Any>;
    affected?: Nullable<number>;
    generatedMaps: Any;
}

export class DeleteResult {
    raw?: Nullable<Any>;
    affected?: Nullable<number>;
}

export type Any = any;
type Nullable<T> = T | null;
