import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Articulo {
    //@Column({ primary: true, generated: true })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()     
    titulo: string;

    @Column()
    contenido: string;

    @Column()
    fechaPublicacion: Date;

    @Column()
    autor: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
