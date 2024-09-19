import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { FunQueryAstType, Entity } from './generated/ast.js';
import type { FunQueryServices } from './fun-query-module.js';


// Register custom validation checks.
export function registerValidationChecks(services: FunQueryServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.FunQueryValidator;
    const checks: ValidationChecks<FunQueryAstType> = {
        Entity: validator.checkEntityDoesNotStartWithQ
    };
    registry.register(checks, validator);
}

// Implementation of custom validations.
export class FunQueryValidator {

    checkEntityDoesNotStartWithQ(entity: Entity, accept: ValidationAcceptor): void {
        if (!entity.name) {
            return;
        }
        if (entity.name.startsWith('Q')) {
            accept('warning', 'Entity name should not start with Q.', { node: entity, property: 'name' });
        }
    }

}
