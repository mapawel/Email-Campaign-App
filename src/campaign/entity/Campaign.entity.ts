import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CampaignStatus } from '../status/campaign-status.enum';
import { MailContentType } from 'src/template/types/Mail-content.type';

@Entity()
export class Campaign {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: CampaignStatus,
        default: CampaignStatus.PREPARING,
    })
    status: CampaignStatus;

    @Column()
    templateId: number;

    @Column('json')
    content: MailContentType;

    @Column('simple-array')
    eMails: string[];

    @Column()
    manager: number; // user id from Auth0

    @Column('simple-array')
    employees: number[];

    @Column()
    eMailProvider: number;

    @Column()
    preparedAt: Date;

    @Column()
    executedAt: Date;

    @Column()
    errorAt: Date;

    @Column()
    errorReason: string;

    @Column()
    preparedBy: number; // user id from Auth0

    @Column()
    executedBy: number; // user id from Auth0

    @Column()
    updatedBy: number; // user id from Auth0
}
