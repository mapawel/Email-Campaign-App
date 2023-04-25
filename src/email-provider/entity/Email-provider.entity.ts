import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Campaign } from '../../campaign/entity/Campaign.entity';

@Entity()
export class EmailProvider {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    eMail: string;

    @OneToMany(() => Campaign, (campaign) => campaign.eMailProvider)
    campaigns: Campaign[];
}
