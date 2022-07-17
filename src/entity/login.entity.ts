import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class Login {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    fullname: string;

    @Column()
    username: string;
    
    @Column()
    password: string
    
    @Column()
    created_at: Date

    @Column()
    update_at: Date
}