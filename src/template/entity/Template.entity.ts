import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Campaign } from 'src/campaign/entity/Campaign.entity';

@Entity()
export class Template {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    createdBy: string;

    @Column()
    updatedBy: string;

    @Column()
    fileId: string;

    @OneToMany(() => Campaign, (campaign) => campaign.template, { eager: true})
    campaigns: Campaign[];
}
