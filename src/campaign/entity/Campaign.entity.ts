import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { CampaignStatus } from '../status/campaign-status.enum';
import { MailContentType } from 'src/template/types/Mail-content.type';
import { Template } from 'src/template/entity/Template.entity';
import { EmailProvider } from '../../email-provider/entity/Email-provider.entity';

@Entity()
export class Campaign {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    descritpion: string;

    @Column({
        type: 'enum',
        enum: CampaignStatus,
        default: CampaignStatus.PREPARING,
    })
    status: CampaignStatus;

    @ManyToOne(() => Template, (template) => template.campaigns, {
        cascade: true,
    })
    @JoinColumn()
    template: Template;

    @Column('json')
    content: MailContentType;

    @Column('simple-array')
    eMails: string[];

    @Column()
    manager: string; // user id from Auth0

    @Column('simple-array')
    employees: string[];

    @ManyToOne(
        () => EmailProvider,
        (eMailProvider) => eMailProvider.campaigns,
        { cascade: true },
    )
    @JoinColumn()
    eMailProvider: EmailProvider;

    @Column()
    preparedAt: Date;

    @Column()
    executedAt: Date;

    @Column()
    errorAt: Date;

    @Column()
    errorReason: string;

    @Column()
    preparedBy: string; // user id from Auth0

    @Column()
    executedBy: string; // user id from Auth0

    @Column()
    updatedBy: string; // user id from Auth0
}
