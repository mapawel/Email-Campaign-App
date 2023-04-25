import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';
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
    createdAt: Date;

    @Column({ nullable: true })
    updatedBy: string;

    @Column({ nullable: true })
    updatedAt: Date;

    @Column()
    fileId: string;

    @OneToMany(() => Campaign, (campaign) => campaign.template)
    campaigns: Campaign[];
}
