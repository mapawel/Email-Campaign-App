import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { CampaignStatus } from '../status/campaign-status.enum';
import { MailContentDTO } from '../dto/mailContent.dto';
import { Template } from '../../template/entity/Template.entity';
import { EmailProvider } from '../../email-provider/entity/Email-provider.entity';

@Entity()
export class Campaign {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: CampaignStatus,
        default: CampaignStatus.PREPARING,
    })
    status: CampaignStatus;

    @ManyToOne(() => Template, (template) => template.campaigns, {
        eager: true,
    })
    @JoinColumn()
    template: Template;

    @ManyToOne(
        () => EmailProvider,
        (eMailProvider) => eMailProvider.campaigns,
        {
            eager: true,
        },
    )
    @JoinColumn()
    eMailProvider: EmailProvider;

    @Column('json', { nullable: true })
    content: MailContentDTO;

    @Column({ nullable: true })
    eMailTitle: string;

    @Column('simple-array')
    eMails: string[];

    @Column()
    manager: string;

    @Column('simple-array')
    employees: string[];

    @Column({ nullable: true })
    updatedAt: Date;

    @Column({ nullable: true })
    updatedBy: string;

    @Column()
    createdAt: Date;

    @Column()
    createdBy: string;

    @Column({ nullable: true })
    executedAt: Date;

    @Column({ nullable: true })
    executedBy: string;
}
